import { Prisma } from ".prisma/client";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Product {
    @Field(() => ID)
    id!: number;

    @Field(() => String)
    name!: string;

    @Field()
    price!: Prisma.Decimal;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
