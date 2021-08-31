import { FormLabel, Select } from '@chakra-ui/react';
import React from 'react'
import { FilterProps } from 'react-table';

const YesNoFilter: React.FC<FilterProps<any>> = ({ column: { filterValue , setFilter } }) => {
    return (
        <>
            <FormLabel fontSize="xs">Yes or No</FormLabel>
            <Select placeholder="Select option..." value={filterValue} onChange={e => setFilter(e.target.value)}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </Select>
        </>
    );
}

export default YesNoFilter
