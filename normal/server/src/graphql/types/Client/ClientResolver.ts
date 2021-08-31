import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Client } from "./Client";
import { createPaginationInput } from "../../../utils/Pagination";
import { PaginateInput } from "../../inputs/PaginateInput";
import { ContextType } from "../../../types/ContextTypes";
import { ClientInput, UpdateClientInput } from "./ClientInput";
import { Order } from "../Order/Order";
import { validateInput, validatePaginationInput } from "../../../utils/Validation";
import { ClientResponse, PaginatedClientResponse } from "./ClientResponse";

@Resolver(Client)
export class ClientResolver {
    // FieldResolvers
    @FieldResolver(() => [Client])
    branches(
        @Root() client: Client,
        @Ctx() { prisma }: ContextType) {
        return prisma.client.findUnique({where: {id: client.id}}).branches();
    }

    @FieldResolver(() => Client, { nullable: true })
    headquarter(
        @Root() client: Client,
        @Ctx() { prisma }: ContextType,
    ) {
        return prisma.client.findUnique({where: {id: client.id}}).headquarter();
    }

    @FieldResolver(() => [Order])
    orders(
        @Root() client: Client,
        @Ctx() { prisma }: ContextType) {
        return prisma.client.findUnique({where: {id: client.id}}).orders();
    }

    //Queries
    @Query(() => PaginatedClientResponse)
    async clients(
        @Ctx() { prisma }: ContextType,
        @Arg("pagination", () => PaginateInput, { defaultValue: new PaginateInput }) pagination: PaginateInput)
        : Promise<typeof PaginatedClientResponse> 
    {
        const validation = validatePaginationInput(pagination);
        // if (validation.failed) return createPaginationResponse({error: {fields: validation.errors}});
        if (validation.failed) return {fields: validation.errors};

        
        const [clients, agregate] = await prisma.$transaction([
            prisma.client.findMany(createPaginationInput(pagination)),
            prisma.client.aggregate({count: {_all: true}}),
            // prisma.client.findFirst({select: {id: true}, orderBy: {id: 'asc'}})
        ]);


        // let len = clients.length;
        // let hasMore = false;
        // if (len === pagination.take + 1) {
        //     hasMore = true;
        //     clients.splice(-1);
        // }
        // len = clients.length;

        // let cursor: null|number = null;
        // let hasLess = false;
        // if (len > 1) {
        //     if (first) hasLess = clients[0].id > first.id;
        //     cursor = clients[len-1].id;
        // }


        let len = clients.length;
        let hasMore = false;
        let hasLess = false;
        if (len === Math.abs(pagination.take) + 2) {
            hasMore = hasLess = true;
            clients.shift();
            clients.pop();
        } else if (len === Math.abs(pagination.take) + 1) {
            let first = clients[0].id;
            let last = clients[len-1].id;
            let cursor = pagination.cursor ?? -Infinity;
            if (pagination.take > 0) {
                hasLess = first <= cursor;
                hasMore = !hasLess;
                clients.shift();
            } else {
                hasMore = last >= cursor;
                hasLess != hasMore;
                clients.pop();
            }
        }

        return {
            items: clients,
            pagination: {
                total: agregate.count._all,
                hasMore,
                hasLess
            }
        }
    }

    @Query(() => Client, {nullable: true})
    client(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number): Promise<Client | null> {
        return prisma.client.findUnique({where: {id: id}});
    }

    //Mutations
    @Mutation(() => ClientResponse)
    async createClient(
        @Ctx() { prisma }: ContextType,
        @Arg("input", () => ClientInput) input: ClientInput)
        : Promise<ClientResponse> 
    {        
        const validation = validateInput(input);
        if (validation.failed) return {error: {fields: validation.errors}}

        if (!input.is_headquarter && input.headquarter_id === undefined)
            return {error: {execution: "Branch without headquarter id."}}
        else if (input.is_headquarter && input.headquarter_id !== undefined)
            return {error: {execution: "Headquarter with headquarter id."}}
        else if (!input.is_headquarter && input.headquarter_id) {
            const headquarter = await prisma.client.findUnique({
                where: {
                    id: input.headquarter_id
                },
                select: {
                    is_headquarter: true
                }
            });
            if (!headquarter) return {error: {execution: "Headquarter's id not found"}};
            if (!headquarter.is_headquarter) return {error: {execution: "Invalid headquarter id"}};
        }
        
        return {item: await prisma.client.create({ data: input })};
    }

    // @Mutation(() => ClientResponse)
    // async createHeadquarterAndBranches(
    //     @Ctx() { prisma }: ContextType,
    //     @Arg("headquarter", () => HeadquarterBranchInput) headquarter_input: HeadquarterBranchInput,
    //     @Arg("branches", () => [HeadquarterBranchInput]) branches_input: [HeadquarterBranchInput]
    // ): Promise<ClientResponse> {        
    //     const validationObj = {
    //         name: Joi.string().min(2).max(50).required(),
    //         state: Joi.required(),
    //         city: Joi.string().min(2).max(50).required(),
    //         is_headquarter: Joi.allow()
    //     }
    //     const HeadquarterValidation = validateInput(headquarter_input, validationObj);
    //     if (HeadquarterValidation.failed) return {error: {fields: HeadquarterValidation.errors}}
        
    //     for (const branch of branches_input) {
    //         const BranchValidation = validateInput(branch, validationObj);
    //         if (BranchValidation.failed) return {error: {fields: BranchValidation.errors}}
    //     }

    //     headquarter_input.is_headquarter = true
    //     for (const branch of branches_input) branch.is_headquarter = false;
    //     return {
    //         item: await prisma.client.create({
    //             data: {
    //                 ...headquarter_input, 
    //                 branches: {
    //                     createMany: {
    //                         data: branches_input
    //                     }
    //                 }
    //             }
    //         })
    //     };
    // }

    @Mutation(() => Boolean)
    async deleteClient(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number): Promise<boolean> {
        const client = await prisma.client.findUnique({where: {id: id}, select: {id: true}});
        if (client === null) return false;

        await prisma.client.delete({where: {id: id}});
        return true;
    }

    @Mutation(() => Int)
    async deleteClients(
        @Ctx() { prisma }: ContextType,
        @Arg("ids", () => [Int]) ids: [number]): Promise<number> {
        const deleted = await prisma.client.deleteMany({where: {id: {in: ids}}});
        return deleted.count;
    }

    @Mutation(() => ClientResponse)
    async updateClient(
        @Ctx() { prisma }: ContextType,
        @Arg("id", () => Int) id: number,
        @Arg("input", () => UpdateClientInput) input: UpdateClientInput
    ): Promise<ClientResponse> {
        const validation = validateInput(input);
        if (validation.failed) return {error: {fields: validation.errors}}        

        const client = await prisma.client.findUnique({where: {id: id}, select: {id: true}});
        if (client === null) return {error: {execution: "Client not found."}};

        return {
            item: await prisma.client.update({
                where: {id: id},
                data: input
            })
        }
    }

    @Mutation(() => ClientResponse)
    async changeHeadquarter(
        @Ctx() { prisma }: ContextType,
        @Arg("newId", () => Int) newId: number,
    ): Promise<ClientResponse> {
        const client = await prisma.client.findUnique({
            where: {id: newId},
            select: {
                is_headquarter: true,
                headquarter_id: true,
                headquarter: {
                    select: {
                        branches: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
        if (client === null) return {error: {execution: "Client not found."}};
        if (client.is_headquarter) return {error: {execution: "This client it's already a headquarter."}};
        if (client.headquarter_id === null || client.headquarter === null) return {error: {execution: "This client doesn't have a headquarter."}};
        
        let ids: Array<number> = [];
        ids.push(client.headquarter_id);
        for (const branch of client.headquarter.branches) {
            if (branch.id === newId) continue;
            ids.push(branch.id);
        }
        
        const transaction = await prisma.$transaction([
            prisma.client.updateMany({
                where: {id: {in: ids}},
                data: {
                    headquarter_id: newId,
                    is_headquarter: false
                }
            }),
            prisma.client.update({
                where: {id: newId},
                data: {
                    headquarter_id: null,
                    is_headquarter: true
                }
            })
        ]);

        return {item: transaction[1]};
    }
}
