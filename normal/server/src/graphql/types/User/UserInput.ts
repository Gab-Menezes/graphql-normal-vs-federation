import { InputType, Field } from "type-graphql"
import * as jf from "joiful"

@InputType()
export class UserInput {
    @jf.string().min(3).max(50).required()
    @Field()
    name!: string

    @jf.string().min(3).max(50).required()
    @Field()
    username!: string

    @jf.string().min(3).max(50).required()
    @Field()
    password!: string
}

@InputType()
export class LoginInput {
    @jf.string().min(3).max(50).required()
    @Field()
    username!: string

    @jf.string().min(3).max(50).required()
    @Field()
    password!: string
}
