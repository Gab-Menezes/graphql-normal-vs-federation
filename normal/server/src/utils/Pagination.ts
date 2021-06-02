import { PaginateInput } from "../graphql/inputs/PaginateInput";

export function createPaginationResponse<T>(data: T[], total: number, limit: number)
{
    return {
        items: data.slice(0, limit), 
        paginate: {
            total: total, 
            hasMore: (data.length === (limit + 1))
        }
    };
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


