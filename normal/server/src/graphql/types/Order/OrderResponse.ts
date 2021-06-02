import { createUnionType, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../responses/ErrorResponse";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { Order } from "./Order";

@ObjectType()
export class PaginatedOrder extends PaginatedResponse(Order) {}

export const PaginatedOrderResponse = createUnionType({
    name: "PaginatedOrderResponse",
    types: () => [PaginatedOrder, ErrorResponse] as const,
    resolveType: value => {
        if ("items" in value) return PaginatedOrder;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
});

export const OrderResponse = createUnionType({
    name: "OrderResponse",
    types: () => [Order, ErrorResponse] as const,
    resolveType: value => {
        if ("id" in value) return Order;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
});
