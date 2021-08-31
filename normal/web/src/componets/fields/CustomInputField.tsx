import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type CustomInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
    label, 
    size: _,
    ...props
}) => {
    const [field, {error}] = useField(props);
    return (
    <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
    );
}

export default CustomInputField;
