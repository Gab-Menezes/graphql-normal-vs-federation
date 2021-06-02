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

const main = async () => {
    const prisma = new PrismaClient({log: ['query']});
    const app = Fastify();
    app.register(cookie, {} as FastifyCookieOptions);
    app.register(fastifyCors, {
        credentials: true,
        origin: "http://localhost:3000"
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

    
    
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.refresh_token;
        if (!token) return res.send({ ok: false, access_token: ''});
        let payload: any = null;
        try {
            payload = verify(token, process.env.SECRET_REFRESH);
        } catch (error) {
            return res.send({ ok: false, access_token: ''});
        }

        const user = await prisma.user.findUnique({where: {id: payload.userId}});
        if (user === null) return res.send({ success: false, access_token: ''});
        if (user.token_version !== payload.tokenVersion) return res.send({ success: false, access_token: ''});

        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ success: true, access_token: createAccessToken(user)});
    });

    app.register(mercurius, {
        schema: schema,
        graphiql: 'playground',
        context: (req, res) => ({
            // headquarterLoader: createHeadquarterLoader(),
            req: req,
            res: res,
            prisma: prisma
        }),
        // errorHandler: true,
        // errorFormatter: (result, _) => {
        //     // context.reply
        //     // result.data
        //     // result.errors?.forEach((e) => e.message)
        //     return { statusCode: 200, response: result }
        // },
    });

    app.listen(__port__, () => {
        console.log('server started');
    })
};

// function handle(error: FastifyError, request: FastifyRequest, reply: FastifyReply): ExecutionResult {
//     return reply.send("dsa");
// }

main()
.catch(err => {
    console.log(err);
})
