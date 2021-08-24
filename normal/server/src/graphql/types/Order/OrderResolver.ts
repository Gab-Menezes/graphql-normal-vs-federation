import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { PaginateInput } from "../../inputs/PaginateInput";
import { createPaginationInput, createPaginationResponse } from "../../../utils/Pagination";
import { ContextType } from "../../../types/ContextTypes";
import { Order } from "./Order";
import { OrderInput } from "./OrderInput";
import { ProductOrderInput } from "../ProductOrder/ProductOrderInput";
import { ProductOrder } from "../ProductOrder/ProductOrder";
import { Client } from "../Client/Client";
import { OrderResponse, PaginatedOrderResponse } from "./OrderResponse";
import { validateInput, validatePaginationInput } from "../../../utils/Validation";
import Joi from "joi";

@Resolver(Order)
export class OrderResolver {
    // FieldResolvers
    @FieldResolver(() => [ProductOrder])
    products_order(
        @Root() order: Order,
        @Ctx() { prisma }: ContextType)
    {
        return prisma.order.findUnique({where: {id: order.id}}).products_order();
    }

    @FieldResolver(() => Client)
    client(
        @Root() order: Order,
        @Ctx() { prisma }: ContextType) 
    {
        return prisma.order.findUnique({where: {id: order.id}}).client();
    }


    @Query(() => PaginatedOrderResponse)
    async orders(
        @Ctx() { prisma }: ContextType,
        @Arg("client_id", () => Int, {nullable: true}) client_id: number | null,
        @Arg("pagination", () => PaginateInput, { defaultValue: new PaginateInput }) pagination: PaginateInput
    ): Promise<PaginatedOrderResponse>
    {
        const validation = validatePaginationInput(pagination);
        if (validation.failed) return createPaginationResponse({error: {fields: validation.errors}})
        
        const id = client_id === null ? undefined : client_id;
        const paginationObj = createPaginationInput(pagination);
        const orders = await prisma.order.findMany({...paginationObj, where: {id: id}});
        const agregate = await prisma.order.aggregate({count: {_all: true}});
        return createPaginationResponse({
            pagination: {
                items: orders,
                total: agregate.count._all, 
                limit: pagination.limit
            }
        });
    }

    @Query(() => OrderResponse)
    async order(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number
    ): Promise<OrderResponse>
    {
        const order = await prisma.order.findUnique({where: {id: id}});
        if (order === null) return {error: {execution: "Order not found."}};
        return {item: order};
    }

    @Mutation(() => OrderResponse)
    async createOrder(
        @Ctx() { prisma }: ContextType,
        @Arg("order_input", () => OrderInput) order_input: OrderInput,
        @Arg("products_order_input", () => [ProductOrderInput]) products_order_input: [ProductOrderInput],
    ): Promise<OrderResponse>
    {
        const validation = validateInput(order_input, {
            client_id: Joi.number().required(),
            status: Joi.string().required()
        });
        if (validation.failed) return {error: {fields: validation.errors}};

        for (const product_order of products_order_input) {
            const validation = validateInput(product_order, {
                product_id: Joi.number().required(),
                amount: Joi.number().positive().required()
            });
            if (validation.failed) return {error: {fields: validation.errors}};
        }


        const client = await prisma.client.findUnique({where: {id: order_input.client_id}, select: {id: true}});
        if (client === null) return {error: {execution: "Client not found."}}

        products_order_input.sort((a, b) => {return a.product_id - b.product_id});
        
        let productIds: Array<number> = [];
        for (const product of products_order_input) {
            productIds.push(product.product_id);
        }
        const products = await prisma.product.findMany({
            where: {id: {in: productIds}}, 
            select: {id: true, price: true},
            orderBy: {id: "asc"}
        });
        if (products.length !== products_order_input.length) return {error: {execution: "Not all products were found."}}

        for (let i = 0; i < products_order_input.length; i++) {
            const amount = products_order_input[i].amount;
            const price = products[i].price.times(amount)
            order_input.final_price.add(price);
        }

        return {
            item: await prisma.order.create({
                data: {
                    ...order_input,
                    products_order: {
                        createMany: {
                            data: products_order_input
                        }
                    }
                }
            })
        }
    }
}
