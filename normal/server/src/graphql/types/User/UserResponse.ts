import { createUnionType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "../../responses/ErrorResponse";
import PaginatedResponse from "../../responses/PaginatedResponse";
import { User } from "./User";

@ObjectType()
export class PaginationUser extends PaginatedResponse(User){}

export const PaginationUserResponse = createUnionType({
    name: "PaginationUserResponse",
    types: () => [PaginationUser, ErrorResponse] as const,
    resolveType: value => {
        if ("items" in value) return PaginationUser;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})

export const UserResponse = createUnionType({
    name: "UserResponse",
    types: () => [User, ErrorResponse] as const,
    resolveType: value => {
        if ("id" in value) return User;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})


@ObjectType()
export class Login {
    @Field(() => String)
    access_token: string;

    @Field(() => User)
    user: User;
}
export const LoginResponse = createUnionType({
    name: "LoginResponse",
    types: () => [Login, ErrorResponse] as const,
    resolveType: value => {
        if ("id" in value || "access_token" in value) return Login;
        if ("execution" in value || "fields" in value) return ErrorResponse;
        return undefined
    }
})
