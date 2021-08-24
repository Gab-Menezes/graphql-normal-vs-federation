import NormalResponse from "../../responses/NormalResponse";
import { ObjectType } from "type-graphql";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { Order } from "./Order";

@ObjectType()
export class PaginatedOrderResponse extends PaginatedResponse(Order) {}

@ObjectType()
export class OrderResponse extends NormalResponse(Order) {}
