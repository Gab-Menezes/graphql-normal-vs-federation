import { Client } from "./Client";
import { createUnionType, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../responses/ErrorResponse";
import PaginatedResponse from "../../responses/PaginatedResponse";

@ObjectType()
export class PaginatedClient extends PaginatedResponse(Client) {}

export const PaginatedClientResponse = createUnionType({
    name: "PaginationClientResponse",
    types: () => [PaginatedClient, ErrorResponse] as const,
    resolveType: value => {
        if ("items" in value) return PaginatedClient;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})

export const ClientResponse = createUnionType({
    name: "ClientResponse",
    types: () => [Client, ErrorResponse] as const,
    resolveType: value => {
        if ("id" in value) return Client;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})
