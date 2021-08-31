import { FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import React from 'react';
import { FilterProps } from 'react-table';

const NumberFilter: React.FC<FilterProps<any>> = ({ column: { filterValue, setFilter } }) => {    
    return (
        <>
        <FormLabel fontSize="xs">Value</FormLabel>
        <NumberInput>
            <NumberInputField placeholder="Value..." value={filterValue} onChange={(e) => setFilter(e.target.value)}/>
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        </>
    );
}

export default NumberFilter
