import NormalResponse from "../../responses/NormalResponse";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User){}

@ObjectType()
export class UserResponse extends NormalResponse(User){}

@ObjectType()
export class Login {
    @Field(() => String)
    access_token: string;

    @Field(() => User)
    user: User;
}

@ObjectType()
export class LoginResponse extends NormalResponse(Login){}
