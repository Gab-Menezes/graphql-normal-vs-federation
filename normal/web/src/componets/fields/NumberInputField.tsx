import { FormControl, FormErrorMessage, FormLabel, NumberInput, NumberInputField, NumberInputProps } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';

type CustomNumberInputFieldProps = {
    name: string;
    label: string;
    whenEmpty: number

    placeholder?: string;
    numberInput?: NumberInputProps,
}

const CustomNumberInputField: React.FC<CustomNumberInputFieldProps> = ({
    label,
    name,
    whenEmpty,
    placeholder,
    numberInput
}) => {
    const [field, {error, touched}] = useField(name);
    const { setFieldValue } = useFormikContext();
    
    return (
    <FormControl name={name} label={label}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <NumberInput 
            {...field}
            name={name}
            onChange={(val, _) => setFieldValue(name, val)}
            onBlur={({target}) => {
                if (target.defaultValue === "")
                    setFieldValue(name, whenEmpty)
            }}
            isInvalid={!!error && touched}
            {...numberInput} 
        >
            <NumberInputField name={name} placeholder={placeholder}/>
        </NumberInput>

        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
    );
}

export default CustomNumberInputField;
