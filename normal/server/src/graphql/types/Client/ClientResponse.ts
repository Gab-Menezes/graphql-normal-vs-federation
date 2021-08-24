import { Client } from "./Client";
import { ObjectType } from "type-graphql";
import PaginatedResponse from "../../responses/PaginatedResponse";
import NormalResponse from "../../responses/NormalResponse";

@ObjectType()
export class PaginatedClientResponse extends PaginatedResponse(Client) {}

@ObjectType()
export class ClientResponse extends NormalResponse(Client) {}
