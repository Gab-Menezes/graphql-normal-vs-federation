import { ContextType } from "../../types/ContextTypes";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuthMiddleWare: MiddlewareFn<ContextType> = (({context}, next) => {
    const auth = context.req.headers['authorization'];
    if (auth === undefined) throw new Error("Not authenticated");
    try {
        const token = auth.split(" ")[1];
        const payload = verify(token, process.env.SECRET_TOKEN);
        context.payload = payload as any;
    } catch (error) {
        throw new Error("Not authenticated");
    }
    return next();
})
