import { Field, ID, Int, ObjectType } from "type-graphql";
import { Order } from "../Order/Order";
import { Product } from "../Product/Product";

@ObjectType()
export class ProductOrder {
    @Field(() => ID)
    id!: number;

    @Field(() => Int)
    product_id!: number;

    @Field(() => Product)
    product?: Product | null;

    @Field(() => Int)
    order_id!: number;

    @Field(() => Order)
    order?: Order | null;

    @Field(() => Int)
    amount!: number;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
