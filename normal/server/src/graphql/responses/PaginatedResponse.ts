import { ClassType, Field, Int, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class PaginetedObject {
    @Field(() => Int)
    total: number;
}

@ObjectType()
export class PaginetedObject1 {
    @Field(() => Int)
    total: number;

    @Field(() => Boolean)
    hasMore: boolean;

    @Field(() => Boolean)
    hasLess: boolean;
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

export function PaginatedResponse1<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass1 {
        @Field(() => [TItemClass])
        items: TItem[];

        @Field(() => PaginetedObject1)
        pagination: PaginetedObject1;
    }
    return PaginatedResponseClass1;
}
