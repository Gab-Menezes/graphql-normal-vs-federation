import { Client } from "./Client";
import { createUnionType, ObjectType } from "type-graphql";
import { PaginatedResponse1 } from "../../responses/PaginatedResponse";
import NormalResponse from "../../responses/NormalResponse";
import { ErrorResponse } from "../../responses/ErrorResponse";

// @ObjectType()
// export class PaginatedClientResponse extends PaginatedResponse(Client) {}

@ObjectType()
export class PaginatedClient extends PaginatedResponse1(Client) {}

export const PaginatedClientResponse = createUnionType({
    name: "PaginatedClientResponse",
    types: () => [PaginatedClient, ErrorResponse] as const,
    resolveType: value => {
        if ("items" in value) return PaginatedClient;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})

@ObjectType()
export class ClientResponse extends NormalResponse(Client) {}
