import { order_status_enum, Prisma } from "@prisma/client"
import { InputType, Field, Int } from "type-graphql"
import * as jf from 'joiful';

@InputType()
export class OrderInput {
    @jf.number().positive().required()
    @Field(() => Int)
    client_id!: number;

    @jf.string().required()
    @Field(() => order_status_enum)
    status!: order_status_enum;

    final_price: Prisma.Decimal = new Prisma.Decimal(0.0);
}
