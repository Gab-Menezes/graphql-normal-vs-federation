
import { Product } from "./Product";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { ProductInput } from "./ProductInput";
import { PaginateInput } from "../../inputs/PaginateInput";
import { createPaginationInput, createPaginationResponse } from "../../../utils/Pagination";
import { ContextType } from "../../../types/ContextTypes";
import { validateInput, validatePaginationInput } from "../../../utils/Validation";
import { PaginatedProductResponse, ProductResponse } from "./ProductResponse";
import Joi from "joi";

@Resolver(Product)
export class ProductResolver {
    @Query(() => PaginatedProductResponse)
    async products(
        @Ctx() { prisma }: ContextType,
        @Arg("paginate", () => PaginateInput) pagination: PaginateInput): Promise<typeof PaginatedProductResponse>
    {
        const validation = validatePaginationInput(pagination);
        if (validation.failed) return {fields: validation.errors}
        
        const products = await prisma.product.findMany(createPaginationInput(pagination));
        const agregate = await prisma.product.aggregate({count: {_all: true}});
        return createPaginationResponse(products, agregate.count._all, pagination.limit);
    }

    @Query(() => ProductResponse)
    async product(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number): Promise<typeof ProductResponse>
    {
        const product = await prisma.product.findUnique({where: {id: id}});
        if (product === null) return {execution: "Product not found."};
        return product;
    }

    @Mutation(() => ProductResponse)
    async createProduct(
        @Ctx() { prisma }: ContextType,
        @Arg("input", () => ProductInput) input: ProductInput
    ): Promise<typeof ProductResponse>
    {
        const validation = validateInput(input, {
            name: Joi.string().min(2).max(50).required(),
            price: Joi.number().positive().required()
        });
        if (validation.failed) return {fields: validation.errors}

        return prisma.product.create({data: input});
    }

    @Mutation(() => Boolean)
    async deleteProduct(
        @Ctx() { prisma }: ContextType,
        @Arg('id', () => Int) id: number,
    ): Promise<boolean>
    {
        const product = await prisma.product.findUnique({where: {id: id}, select: {id: true}});
        if (product === null) return false;
        await prisma.product.delete({where: {id: id}});
        return true;
    }
}
