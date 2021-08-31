import { PaginateInput } from "../graphql/inputs/PaginateInput";
import { ErrorResponse } from "../graphql/responses/ErrorResponse";

type PaginationResponseObj<T extends {id: number}> = {
    pagination?: {
        items: T[], 
        total: number,
        take: number,
    }
    error?: ErrorResponse
}

export function createPaginationResponse<T  extends {id: number}>({pagination, error}: PaginationResponseObj<T>)
{
    if (pagination) {
        let len = pagination.items.length;

        let hasMore = false;
        if (len === pagination.take + 1) {
            hasMore = true;
            pagination.items.splice(-1)
        }

        len = pagination.items.length;
        return {
            items: pagination.items,
            pagination: {
                total: pagination.total, 
                hasMore,
                cursor: pagination.items[len-1].id
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
    // let order: Record<string,string> = {}
    // order[pagination.orderField] = pagination.orderValue;
    let take = pagination.take;
    if (take >= 0) take++;
    else take--;

    return {
        // take: pagination.take + 1,
        take: take,
        // skip: pagination.offset,
        // skip: pagination.cursor !== null ? 1 : undefined,
        cursor: pagination.cursor !== null ? {id: pagination.cursor} : undefined,
        // orderBy: order,
    }
}


