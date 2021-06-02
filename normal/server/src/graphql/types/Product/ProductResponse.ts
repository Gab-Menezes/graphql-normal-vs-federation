import { createUnionType, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../responses/ErrorResponse";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { Product } from "./Product";

@ObjectType()
export class PaginatedProduct extends PaginatedResponse(Product) {}

export const PaginatedProductResponse = createUnionType({
    name: "PaginatedProductResponse",
    types: () => [PaginatedProduct, ErrorResponse] as const,
    resolveType: value => {
        if ("items" in value) return PaginatedProduct;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
});

export const ProductResponse = createUnionType({
    name: "ProductResponse",
    types: () => [Product, ErrorResponse] as const,
    resolveType: value => {
        if ("id" in value) return Product;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
});
