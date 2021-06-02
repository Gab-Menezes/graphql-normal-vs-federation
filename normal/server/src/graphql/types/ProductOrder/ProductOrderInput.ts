import { InputType, Field, Int } from "type-graphql"

@InputType()
export class ProductOrderInput {
    @Field(() => Int)
    product_id!: number;

    @Field(() => Int)
    amount!: number;
}
