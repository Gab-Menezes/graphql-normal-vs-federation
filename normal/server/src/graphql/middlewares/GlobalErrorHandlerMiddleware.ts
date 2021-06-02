import { __prod__ } from "../../constants";
import { MiddlewareFn } from "type-graphql";

export const GlobalErrorHandlerMiddleware: MiddlewareFn<any> = async ({}, next) => {
    try {
        return await next();
    } catch(err) {
        if (__prod__) {
            throw new Error("Something went wrong.")
        }

        throw err;
    }
}
