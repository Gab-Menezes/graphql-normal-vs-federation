import NormalResponse from "../../responses/NormalResponse";
import { ObjectType } from "type-graphql";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { Product } from "./Product";

@ObjectType()
export class PaginatedProductResponse extends PaginatedResponse(Product) {}

@ObjectType()
export class ProductResponse extends NormalResponse(Product) {}
