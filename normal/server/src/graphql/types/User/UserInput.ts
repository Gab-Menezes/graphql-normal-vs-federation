import { InputType, Field } from "type-graphql"

@InputType()
export class UserInput {
    @Field()
    name: string

    @Field()
    username: string

    @Field()
    password: string
}

@InputType()
export class LoginInput {
    @Field()
    username: string

    @Field()
    password: string
}
