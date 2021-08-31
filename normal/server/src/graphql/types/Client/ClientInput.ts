import { Client } from "./Client";
import { InputType, Field, Int } from "type-graphql";
import { client_state_enum } from "@prisma/client";
import * as jf from 'joiful';

@InputType()
export class ClientInput implements Partial<Client> {
    @jf.string().min(3).max(50).required()
    @Field()
    name!: string;

    @jf.string().required()
    @Field(() => client_state_enum)
    state!: client_state_enum;

    @jf.string().min(3).max(50).required()
    @Field()
    city!: string;

    @jf.number().positive()
    @Field(() => Int, {nullable: true})
    headquarter_id?: number;

    @jf.boolean().required()
    @Field(() => Boolean)
    is_headquarter!: boolean;
}

@InputType()
export class UpdateClientInput implements Partial<Client> {
    @jf.string().min(3).max(50)
    @Field({nullable: true})
    name?: string;

    @jf.string()
    @Field(() => client_state_enum, {nullable: true})
    state?: client_state_enum;

    @jf.string().min(3).max(50)
    @Field({nullable: true})
    city?: string;
}
