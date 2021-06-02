// import { StateEnum } from "../enums/StateEnum";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { client_state_enum } from ".prisma/client";
import { Order } from "../Order/Order";

registerEnumType(client_state_enum, {
    name: "States",
    description: "Code of each state"
})

@ObjectType()
export class Client {
    @Field(() => ID)
    id!: number;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    city!: string;

    @Field(() => client_state_enum)
    state!: client_state_enum;

    @Field(() => Boolean)
    is_headquarter!: boolean;

    //Relationship
    @Field(() => Int, {nullable: true})
    headquarter_id?: number | null;

    @Field(() => Client, {nullable: true})
    headquarter?: Client | null;

    @Field(() => [Client])
    branches?: Client[] | null;

    @Field(() => [Order])
    orders?: Order[] | null;

    //Logging
    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
