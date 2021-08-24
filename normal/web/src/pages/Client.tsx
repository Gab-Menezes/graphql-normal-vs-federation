import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Column, useFilters, useSortBy, useTable } from 'react-table';
import NumberFilter from '../componets/filters/NumberFilter';
import Wrapper from '../componets/Wrapper';
import { ClientsQuery, useClientsQuery } from '../generated/graphql';

interface ClientProps {

}
type dataType = ClientsQuery["clients"]["items"][number];

const Client: React.FC<ClientProps> = () => {
    const {data} = useClientsQuery();

    const tableData = useMemo(() => data?.clients.items ?? [], [data]);

    const columns = useMemo<Array<Column<dataType>>>(() => [
        {
            Header: "ID",
            accessor: "id",
            Filter: NumberFilter,
            filter: ''
        },
        {
            Header: "Name",
            accessor: "name",
            Filter: NumberFilter
        },
        {
            Header: "City",
            accessor: "city",
            Filter: NumberFilter
        },
        {
            Header: "State",
            accessor: "state",
            Filter: NumberFilter
        },
        {
            Header: "Is Headquarter",
            accessor: d => d.is_headquarter ? "Yes" : "No",
            Filter: NumberFilter
        },
        {
            Header: "ID Headquarter",
            accessor: "headquarter_id",
            Filter: NumberFilter
        },
        {
            Header: "Headquarter Name",
            accessor: d => d.headquarter?.name,
            Filter: (<></>)
        }

    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<dataType>({ columns, data: tableData }, useFilters, useSortBy);

    return (
        <Wrapper variant="1200px">
            <Table variant="striped" {...getTableProps()}>
                <TableCaption>Clients</TableCaption>
                <Thead>
                {
                    headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <>
                                        <Th {...column.getHeaderProps()}>
                                            <Box {...column.getSortByToggleProps()} mb="2">
                                                {column.render("Header")}
                                                <chakra.span pl="4">
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
                                            {column.canFilter ? column.render('Filter') : null}
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

export default Client;
