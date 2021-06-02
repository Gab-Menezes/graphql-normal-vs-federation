import { OrderByEnum } from "../enums/OrderEnum"
import { InputType, Field, Int } from "type-graphql"

@InputType()
export class PaginateInput {
    @Field(() => Int, {defaultValue: 0})
    offset!: number

    @Field(() => Int, {defaultValue: 30})
    limit!: number

    @Field(() => String, {defaultValue: "id"})
    orderField!: string

    @Field(() => OrderByEnum, {defaultValue: OrderByEnum.ASC})
    orderValue!: OrderByEnum
}
