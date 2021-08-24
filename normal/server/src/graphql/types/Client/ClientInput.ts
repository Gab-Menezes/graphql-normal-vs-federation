import { Client } from "./Client";
import { InputType, Field, Int } from "type-graphql";
import { client_state_enum } from "@prisma/client";

@InputType()
export class HeadquarterBranchInput implements Partial<Client> {
    @Field()
    name!: string;

    @Field(() => client_state_enum)
    state!: client_state_enum;

    @Field()
    city!: string;

    is_headquarter: boolean;
}

@InputType()
export class ClientInput implements Partial<Client> {
    @Field()
    name!: string;

    @Field(() => client_state_enum)
    state!: client_state_enum;

    @Field()
    city!: string;

    @Field(() => Int, {nullable: true})
    headquarter_id?: number;

    @Field(() => Boolean)
    is_headquarter!: boolean;
}

@InputType()
export class UpdateClientInput implements Partial<Client> {
    @Field({nullable: true})
    name?: string;

    @Field(() => client_state_enum, {nullable: true})
    state?: client_state_enum;

    @Field({nullable: true})
    city?: string;
}


