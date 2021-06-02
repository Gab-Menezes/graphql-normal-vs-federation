import { registerEnumType } from "type-graphql";

export enum OrderByEnum {
    ASC = "asc",
    DESC = "desc"
}

registerEnumType(OrderByEnum, {
    name: "OrderBy",
    description: "OrderBy"
})
