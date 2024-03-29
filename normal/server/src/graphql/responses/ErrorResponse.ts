import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}


@ObjectType()
export class ErrorResponse {
    @Field(() => [FieldError], {nullable: true})
    fields?: FieldError[];

    @Field(() => String, {nullable: true})
    execution?: string;
}
