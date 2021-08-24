// import { StateEnum } from "../enums/StateEnum";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { order_status_enum, Prisma } from "@prisma/client";
import { Client } from "../Client/Client";
import { ProductOrder } from "../ProductOrder/ProductOrder";

registerEnumType(order_status_enum, {
    name: "Status",
    description: "Status of an order"
});

@ObjectType()
export class Order {
    @Field(() => ID)
    id!: number;

    @Field()
    final_price!: Prisma.Decimal;

    @Field(() => Int)
    client_id!: number;

    @Field(() => Client)
    client?: Client | null;

    @Field(() => [ProductOrder])
    products_order?: ProductOrder[] | null;

    @Field(() => order_status_enum)
    status!: order_status_enum;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
