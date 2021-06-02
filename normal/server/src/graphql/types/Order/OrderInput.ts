import { order_status_enum, Prisma } from "@prisma/client"
import { InputType, Field, Int } from "type-graphql"

@InputType()
export class OrderInput {
    @Field(() => Int)
    client_id!: number;

    @Field(() => order_status_enum)
    status!: order_status_enum;

    final_price: Prisma.Decimal = new Prisma.Decimal(0.0);
}
