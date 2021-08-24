import { ClassType, Field, Int, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class PaginetedObject {
    @Field(() => Int)
    total: number;

    @Field(() => Boolean)
    hasMore: boolean;
}

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        @Field(() => [TItemClass])
        items: TItem[];

        @Field(() => PaginetedObject, {nullable: true})
        pagination?: PaginetedObject|null;

        @Field(() => ErrorResponse, {nullable: true})
        error?: ErrorResponse;
    }
    return PaginatedResponseClass;
}
