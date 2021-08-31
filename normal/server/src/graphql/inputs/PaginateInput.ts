// import { OrderByEnum } from "../enums/OrderEnum"
import { InputType, Field, Int } from "type-graphql"
import * as jf from 'joiful';
@InputType()
export class PaginateInput {
    // @jf.number().min(0).required()
    // @Field(() => Int, { defaultValue: 0 })
    // offset: number = 0;

    // @jf.number().positive().max(200).required()
    // @Field(() => Int, { defaultValue: 30 })
    // limit: number = 30;

    @jf.number().allow(null)
    @Field(() => Int, { nullable: true })
    cursor: number|null = null;

    @jf.number().min(-2000).max(2000).disallow(0).required()
    @Field(() => Int, { defaultValue: 30 })
    take: number = 30;

    // @jf.string().required()
    // @Field(() => String, { defaultValue: "id" })
    // orderField: string = "id";

    // @jf.string().required()
    // @Field(() => OrderByEnum, { defaultValue: OrderByEnum.ASC })
    // orderValue: OrderByEnum = OrderByEnum.ASC;
}
