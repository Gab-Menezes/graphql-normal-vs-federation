import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id!: number;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    username!: string;

    password!: string;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    token_version: number;
}
