import { EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Flex, IconButton, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { TableInstance } from 'react-table';
import Wrapper from './Wrapper';

interface CustomTableProps {
    name: string,
    table: TableInstance<any>,
}

const CustomTable: React.FC<CustomTableProps> = ({name, table}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;

    return (
        <Wrapper variant="1200px">
            <Table variant="striped" {...getTableProps()}>
            <TableCaption>{name}</TableCaption>
            <Thead>
            {
                headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column) => (
                                <>
                                    <Th {...column.getHeaderProps()} fontSize="sm">
                                        <Flex>
                                            <Box {...column.getSortByToggleProps()} mt="2" >
                                                {column.render("Header")}
                                                <chakra.span pl="5">
                                                {
                                                    column.isSorted ? (
                                                        column.isSortedDesc ? 
                                                        (<TriangleDownIcon aria-label="sorted descending" />) 
                                                        : 
                                                        (<TriangleUpIcon aria-label="sorted ascending" />)
                                                    ) : null
                                                }
                                                </chakra.span>
                                            </Box>
                                            {
                                                column.canFilter ? 
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <IconButton aria-label="filter" size="sm" icon={<EditIcon />} />
                                                    </PopoverTrigger>
                                                    <PopoverContent p="4">
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        { column.render("Filter") }
                                                    </PopoverContent>
                                                </Popover>
                                                : 
                                                null
                                            }
                                        </Flex>
                                    </Th>
                                </>
                            ))
                        }
                    </Tr>
                ))
            }
            </Thead>
            <Tbody {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row)
                    return (
                        <Tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <Td {...cell.getCellProps()}>
                                {cell.render("Cell")}
                            </Td>
                        ))}
                        </Tr>
                    )
                })
            }
            </Tbody>
        </Table>
        </Wrapper>
    );
}

export default CustomTable
