import { OrderByEnum } from "../enums/OrderEnum"
import { InputType, Field, Int } from "type-graphql"

@InputType()
export class PaginateInput {
    @Field(() => Int, { defaultValue: 0 })
    offset: number = 0;

    @Field(() => Int, { defaultValue: 30 })
    limit: number = 30;

    @Field(() => String, { defaultValue: "id" })
    orderField: string = "id";

    @Field(() => OrderByEnum, { defaultValue: OrderByEnum.ASC })
    orderValue: OrderByEnum = OrderByEnum.ASC;
}
