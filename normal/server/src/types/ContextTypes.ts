import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export type reqType = FastifyRequest<RouteGenericInterface, Server, IncomingMessage>;
export type resType = FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>;

export type ContextType = {
    prisma: PrismaClient
    req: reqType
    res: resType
    payload?: { userId: string };
}
