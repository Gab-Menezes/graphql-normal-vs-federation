import { FormLabel, Input } from '@chakra-ui/react';
import React from 'react'
import { FilterProps } from 'react-table';

const DefaultFilter: React.FC<FilterProps<any>> = ({ column: { filterValue , setFilter } }) => {
    return (
        <>
            <FormLabel fontSize="xs">Value</FormLabel>
            <Input value={filterValue} onChange={(e) => setFilter(e.target.value)} placeholder="Value..."/>
        </>
    );
}

export default DefaultFilter
