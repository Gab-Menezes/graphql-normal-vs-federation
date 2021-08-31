import { validateInput, validatePaginationInput } from "../../../utils/Validation";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { PaginateInput } from "../../inputs/PaginateInput";
import { LoginResponse, PaginatedUserResponse, UserResponse } from "./UserResponse";
import { ContextType } from "../../../types/ContextTypes";
import { createPaginationInput, createPaginationResponse } from "../../../utils/Pagination";
import { LoginInput, UserInput } from "./UserInput";
import argon2 from "argon2"
import { sendRefreshToken, createRefreshToken, createAccessToken, clearRefreshToken } from "../../../utils/Token";
import { isAuthMiddleWare } from "../../middlewares/IsAuthMiddleware";
import { User } from "./User";

@Resolver(User)
export class UserResolver {
    @Query(() => PaginatedUserResponse)
    async users(
        @Ctx() { prisma }: ContextType,
        @Arg("pagination", () => PaginateInput, { defaultValue: new PaginateInput }) pagination: PaginateInput,
    ): Promise<PaginatedUserResponse>
    {
        const validation = validatePaginationInput(pagination);
        if (validation.failed) return createPaginationResponse({ error: { fields: validation.errors } })

        const users = await prisma.user.findMany(createPaginationInput(pagination));
        const agregate = await prisma.user.aggregate({count: {_all: true}});
        return createPaginationResponse({
            pagination: {   
                items: users, 
                total: agregate.count._all,
                take: pagination.take
            }
        });
    }

    @Query(() => UserResponse)
    async user(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number
    ): Promise<UserResponse>
    {
        const user = await prisma.user.findUnique({where: {id}});;
        if (user === null) return { error: {execution: "User not found."} }
        return { item: user};
    }

    @Mutation(() => UserResponse)
    async createUser(
        @Ctx() { prisma }: ContextType,
        @Arg("input", () => UserInput) input: UserInput
    ): Promise<UserResponse>
    {
        const validation = validateInput(input);
        if (validation.failed) return { error: { fields: validation.errors }}

        const user = await prisma.user.findUnique({where: {username: input.username}, select: {id: true}});
        if (user) return {error: {fields: [{field: "username", message: "Username already taken."}]}}

        return {
            item: await prisma.user.create({
                data: {
                    name: input.name,
                    username: input.username,
                    password: await argon2.hash(input.password)
                }
            })
        };
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Ctx() { prisma }: ContextType,
        @Arg('id', () => Int) id: number,
    ): Promise<boolean>
    {
        const user = await prisma.user.findUnique({where: {id: id}, select: {id: true}});
        if (user === null) return false;

        await prisma.user.delete({where: {id}});
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Ctx() { prisma, res }: ContextType,
        @Arg("input", () => LoginInput) input: LoginInput
    ): Promise<LoginResponse>
    {
        const validation = validateInput(input);
        if (validation.failed) return { error: { fields: validation.errors }}
        
        const user = await prisma.user.findUnique({where: {username: input.username}});
        if (user === null) return { error: {execution: "Invalid login."}};

        const valid = await argon2.verify(user.password, input.password)
        if (!valid) return {error: {execution: "Invalid login."}};

        sendRefreshToken(res, createRefreshToken(user));
        return {item: { access_token: createAccessToken(user), user: user }}
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res }: ContextType,
    ): Promise<boolean>
    {
        clearRefreshToken(res);
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokens(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number,
    ): Promise<boolean>
    {
        const user = await prisma.user.findUnique({where: {id: id}, select: {token_version: true}});
        if (user === null) return false;

        await prisma.user.update({where: {id: id}, data: { token_version: user.token_version+1 }});
        return true;
    }

    @Query(() => User)
    @UseMiddleware(isAuthMiddleWare)
    async me(@Ctx() {prisma, payload}: ContextType) : Promise<User>
    {
        const user = await prisma.user.findUnique({where: {id: parseInt(payload!.userId)}});
        if (!user) throw new Error("Something went wrong.")
        return user;
    }
}
