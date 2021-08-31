
import { Product } from "./Product";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { ProductInput } from "./ProductInput";
import { PaginateInput } from "../../inputs/PaginateInput";
import { createPaginationInput, createPaginationResponse } from "../../../utils/Pagination";
import { ContextType } from "../../../types/ContextTypes";
import { validateInputManual, validatePaginationInput } from "../../../utils/Validation";
import { PaginatedProductResponse, ProductResponse } from "./ProductResponse";
import Joi from "joi";

@Resolver(Product)
export class ProductResolver {
    @Query(() => PaginatedProductResponse)
    async products(
        @Ctx() { prisma }: ContextType,
        @Arg("paginate", () => PaginateInput, { defaultValue: new PaginateInput }) pagination: PaginateInput
    ): Promise<PaginatedProductResponse>
    {
        const validation = validatePaginationInput(pagination);
        if (validation.failed) return createPaginationResponse({error: {fields: validation.errors}})
        
        const products = await prisma.product.findMany(createPaginationInput(pagination));
        const agregate = await prisma.product.aggregate({count: {_all: true}});
        return createPaginationResponse({
            pagination: {
                items: products, 
                total: agregate.count._all, 
                take: pagination.take
            }
        });
    }

    @Query(() => ProductResponse)
    async product(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number
    ): Promise<ProductResponse>
    {
        const product = await prisma.product.findUnique({where: {id: id}});
        if (product === null) return {error: {execution: "Product not found."}};
        return {item: product};
    }

    @Mutation(() => ProductResponse)
    async createProduct(
        @Ctx() { prisma }: ContextType,
        @Arg("input", () => ProductInput) input: ProductInput
    ): Promise<ProductResponse>
    {
        //TODO[Gabriel Menezes](2021-08-25): price is Decimal not a number
        const validation = validateInputManual(input, {
            name: Joi.string().min(2).max(50).required(),
            price: Joi.number().positive().required()
        });
        if (validation.failed) return {error: {fields: validation.errors}}

        return {item: await prisma.product.create({data: input})};
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
