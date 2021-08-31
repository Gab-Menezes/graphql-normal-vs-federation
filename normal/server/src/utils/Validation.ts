import { FieldError } from "../graphql/responses/ErrorResponse";
import Joi from "joi";
import { PaginateInput } from "../graphql/inputs/PaginateInput";
import * as jf from 'joiful';

export function createFieldErrorResponse(error: Joi.ValidationError): FieldError[] {
    let fields: FieldError[] = [];
    for (const detail of error.details)
        fields.push({field: (detail.path[0] as string), message: detail.message});
    return fields;
}

type validateInputType = {
    failed: boolean
    errors: ReturnType<typeof createFieldErrorResponse>
}

export function validateInput(input: any): validateInputType {
    const validation = jf.validate(input, {abortEarly: false});
    if (validation.error) return {failed: true, errors: createFieldErrorResponse(validation.error)};
    return {failed: false, errors: []}
}

export function validateInputManual(input: any, validations: Joi.SchemaMap<any>): validateInputType {
    const validation = Joi.object(validations).validate(input, {abortEarly: false});
    if (validation.error) return {failed: true, errors: createFieldErrorResponse(validation.error)};
    return {failed: false, errors: []}
}

export function validatePaginationInput(pagination: undefined|PaginateInput): validateInputType {    
    if (!pagination) pagination = new PaginateInput;
    return validateInput(pagination);
}
