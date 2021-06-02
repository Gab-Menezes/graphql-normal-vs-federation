import { Prisma } from ".prisma/client"
import { InputType, Field } from "type-graphql"
import { DecimalScalar } from "../../scalars/DecimalScalar"

@InputType()
export class ProductInput {
    @Field()
    name!: string

    @Field(() => DecimalScalar)
    price!: Prisma.Decimal
}
