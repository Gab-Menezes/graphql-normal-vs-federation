import { PaginateInput } from "../graphql/inputs/PaginateInput";
import { ErrorResponse } from "../graphql/responses/ErrorResponse";

type PaginationResponseObj<T> = {
    pagination?: {
        items: T[], 
        total: number, 
        limit: number,
    }
    error?: ErrorResponse
}

export function createPaginationResponse<T>({pagination, error}: PaginationResponseObj<T>)
{
    if (pagination) {
        return {
            items: pagination.items,
            pagination: {
                total: pagination.total, 
                hasMore: (pagination.items.length === (pagination.limit + 1))
            },
            error
        }
    } else {
        return {
            items: [],
            pagination: null,
            error
        }
    }
}

export function createPaginationInput(pagination: PaginateInput)
{
    let order: Record<string,string> = {}
    order[pagination.orderField] = pagination.orderValue;

    return {
        take: pagination.limit + 1,
        skip: pagination.offset,
        orderBy: order,
    }
}


