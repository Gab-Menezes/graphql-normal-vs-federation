import { ChevronLeftIcon, ChevronRightIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Button, chakra, Flex, IconButton, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Column, useFilters, useSortBy, useTable } from 'react-table';
import CustomNumberInputField from '../componets/fields/NumberInputField';
// import CustomTable from '../componets/CustomTable';
import DefaultFilter from '../componets/filters/DefaultFilter';
import NumberFilter from '../componets/filters/NumberFilter';
import YesNoFilter from '../componets/filters/YesNoFilter';
import Wrapper from '../componets/Wrapper';
import { ClientsQuery, useClientsQuery } from '../generated/graphql';

interface ClientProps {

}

const Client: React.FC<ClientProps> = () => {
    const initialTake = 45;

    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingPrev, setLoadingPrev] = useState(false);
    
    type clientType = Extract<ClientsQuery["clients"], {__typename: "PaginatedClient"}>["items"][number]

    const { data, loading, refetch } = useClientsQuery({
        variables: {
            pagination: {
                take: initialTake
            }
        }
    });
    
    let tableData: Array<clientType> = [];
    if (data?.clients.__typename === "PaginatedClient")
        tableData = data?.clients.items ?? [];

    const columns = useMemo<Array<Column<clientType>>>(() => [
        {
            Header: "ID",
            accessor: "id",
            Filter: NumberFilter
        },
        {
            Header: "Name",
            accessor: "name",
            Filter: DefaultFilter
        },
        {
            Header: "City",
            accessor: "city",
            Filter: DefaultFilter
        },
        {
            Header: "State",
            accessor: "state",
            Filter: DefaultFilter
        },
        {
            Header: "Is Headquarter",
            accessor: "is_headquarter",
            Cell: ({ value }) => value ? "Yes" : "No",
            Filter: YesNoFilter
        },
        {
            Header: "ID Headquarter",
            accessor: "headquarter_id",
            Filter: NumberFilter
        },
        {
            Header: "Headquarter Name",
            accessor: d => d.headquarter?.name,
            Filter: DefaultFilter
        }

    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<clientType>(
        {
            columns,
            data: tableData,
        },
        useFilters,
        useSortBy,
    );

    if (loading) return (<div>Loading...</div>)
    if (!data || data.clients.__typename === "ErrorResponse") return (<div>Error...</div>)

    // const cursor = data.clients.pagination.cursor;
    const hasMore = data.clients.pagination.hasMore;
    const hasLess = data.clients.pagination.hasLess;

    console.log(data.clients.pagination);
    
    return (
    <>
        <Formik 
            initialValues={{take: initialTake}}
            onSubmit={async (values) => {
                try {
                    console.log('submit', values.take);
                    await refetch({pagination: {
                        //@ts-ignore
                        take: parseInt(values.take)
                    }})
                } catch(err) {
                    console.log(err)
                }
            }}
            >
            {({isSubmitting, values}) => (
                <>
                <Wrapper variant="400px">
                    <Form>
                        <CustomNumberInputField 
                            name="take"
                            placeholder="Take"
                            label="Take"
                            whenEmpty={initialTake}
                            numberInput={{min: -2000, max: 2000, isRequired: true}}
                        />
                        <Button mt={4} type="submit" colorScheme="blue" isLoading={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                </Wrapper>

                <Wrapper variant="1200px">
                    <Flex>
                        <IconButton 
                            aria-label="prev" 
                            size="md" 
                            icon={<ChevronLeftIcon />} 
                            onClick={async ()=> {
                                setLoadingPrev(true);
                                await refetch({
                                    pagination: {
                                        //@ts-ignore
                                        take: -parseInt(values.take),
                                        cursor: tableData?.[0].id
                                    }
                                })
                                setLoadingPrev(false)
                            }}
                            disabled={!hasLess}
                            isLoading={loadingPrev}
                        />
                        <IconButton 
                            aria-label="next" 
                            size="md" 
                            icon={<ChevronRightIcon />} 
                            onClick={async ()=> {                                
                                setLoadingNext(true);
                                await refetch({
                                    pagination: {
                                        //@ts-ignore
                                        take: parseInt(values.take),
                                        cursor: tableData?.[tableData.length-1].id
                                    }
                                })
                                setLoadingNext(false)
                            }} 
                            disabled={!hasMore}
                            isLoading={loadingNext}
                        />

                    </Flex>
                </Wrapper>
                </>
            )}
        </Formik>

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
    </>
    );
}

export default Client;
