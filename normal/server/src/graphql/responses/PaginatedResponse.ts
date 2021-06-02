import { ClassType, Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class PaginetedObject {
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
        pagination?: PaginetedObject;
    }
    return PaginatedResponseClass;
}
