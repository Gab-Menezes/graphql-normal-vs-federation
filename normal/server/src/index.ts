import "dotenv-safe/config";
import "reflect-metadata";
import mercurius from "mercurius";
import { Prisma, PrismaClient } from '@prisma/client';
import Fastify from "fastify";
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastifyCors from "fastify-cors";
import { verify } from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { __port__ } from "./constants";
import { ClientResolver } from "./graphql/types/Client/ClientResolver";
import { OrderResolver } from "./graphql/types/Order/OrderResolver";
import { ProductOrderResolver } from "./graphql/types/ProductOrder/ProductOrderResolver";
import { ProductResolver } from "./graphql/types/Product/ProductResolver";
import { UserResolver } from "./graphql/types/User/UserResolver";
import { createAccessToken, createRefreshToken, sendRefreshToken } from './utils/Token';
import { DecimalScalar } from "./graphql/scalars/DecimalScalar";
import AltairFastify from 'altair-fastify-plugin';

const main = async () => {
    const prisma = new PrismaClient({log: ['query']});
    const app = Fastify();
    app.register(cookie, {} as FastifyCookieOptions);
    app.register(fastifyCors, {
        credentials: true,
        origin: [process.env.FRONTEND_URL]
    });

    const schema = await buildSchema({
        resolvers: [UserResolver, ClientResolver, ProductResolver, OrderResolver, ProductOrderResolver],
        scalarsMap: [{type: Prisma.Decimal, scalar: DecimalScalar}],
        validate: false
        //globalMiddlewares: [GlobalErrorHandlerMiddleware]
    });
    // SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
    //     upper: UpperCaseDirective,
    // });

    app.register(mercurius, {
        schema: schema,
        context: (req, res) => ({
            req: req,
            res: res,
            prisma: prisma
        }),
        graphiql: false,
        ide: false,
    });

    app.register(AltairFastify, {
        path: '/altair',
        baseURL: '/altair/',
        endpointURL: '/graphql'
    });

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies?.['refresh_token'];
        if (!token) return res.send({ access_token: ''});
        let payload: any = null;
        try {
            payload = verify(token, process.env.SECRET_REFRESH);
        } catch (error) {
            return res.send({ access_token: ''});
        }

        const user = await prisma.user.findUnique({where: {id: payload.userId}});
        if (user === null) return res.send({ access_token: ''});
        if (user.token_version !== payload.tokenVersion) return res.send({ access_token: ''});

        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ access_token: createAccessToken(user)});
    });

    app.listen(__port__, '0.0.0.0', () => {
        console.log('server started');
    })
};

main()
.catch(err => {
    console.log(err);
})

