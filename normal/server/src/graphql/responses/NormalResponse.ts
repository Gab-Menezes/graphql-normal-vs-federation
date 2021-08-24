import { ClassType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

export default function NormalResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class NormalResponseClass {
        @Field(() => TItemClass, {nullable: true, defaultValue: null})
        item?: TItem|null = null;

        @Field(() => ErrorResponse, {nullable: true})
        error?: ErrorResponse;
    }
    return NormalResponseClass;
}
