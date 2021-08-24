import { Input } from '@chakra-ui/react';
import React from 'react'
import { FilterProps } from 'react-table';

const NumberFilter: React.FC<FilterProps<any>> = ({ column: { filterValue , setFilter } }) => {
    return (
        <>
        <Input 
            value={filterValue} 
            onChange={(e) => setFilter(e.target.value)} 
            size="xs" 
            variant="filled"
            borderColor="gray.700"
            // width=""
        />
        <Input 
            value={filterValue} 
            onChange={(e) => setFilter(e.target.value)} 
            size="xs" 
            variant="filled"
            borderColor="gray.700"
            // width=""
        />
        </>
    );
}

export default NumberFilter
