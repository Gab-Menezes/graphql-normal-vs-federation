import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Order } from "../Order/Order";
import { Product } from "../Product/Product";
import { ProductOrder } from "./ProductOrder";
import { ContextType } from "../../../types/ContextTypes";

@Resolver(ProductOrder)
export class ProductOrderResolver {
    // FieldResolvers
    @FieldResolver(() => Product)
    product(
        @Root() productOrder: ProductOrder,
        @Ctx() { prisma }: ContextType)
    {
        return prisma.product_order.findUnique({where: {id: productOrder.id}}).product();
    }

    @FieldResolver(() => Order)
    order(
        @Root() productOrder: ProductOrder,
        @Ctx() { prisma }: ContextType) 
    {
        return prisma.product_order.findUnique({where: {id: productOrder.id}}).order();
    }
}
