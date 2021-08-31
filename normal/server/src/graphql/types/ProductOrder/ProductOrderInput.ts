import { InputType, Field, Int } from "type-graphql"
import * as jf from "joiful"

@InputType()
export class ProductOrderInput {
    @jf.number().positive().required()
    @Field(() => Int)
    product_id!: number;

    @jf.number().positive().required()
    @Field(() => Int)
    amount!: number;
}
