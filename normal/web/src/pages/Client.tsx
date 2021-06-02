import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import React from 'react';
import Wrapper from '../componets/Wrapper';
import { useClientsQuery } from '../generated/graphql';

interface ClientProps {

}

const Client: React.FC<ClientProps> = () => {
    const {data} = useClientsQuery();
    if (!data?.clients) return <div>Error</div>
    if (data.clients.__typename === "ErrorResponse") return <div>Error</div>
    
    return (
        <Wrapper variant="1200px">
            <Table variant="striped">
                <TableCaption>Clients</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>City</Th>
                        <Th>State</Th>
                        <Th>Is Headquarter</Th>
                        <Th>Headquarter ID</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.clients.items.map((client) => {
                            return (
                                <Tr>
                                    <Td>{client.id}</Td>
                                    <Td>{client.name}</Td>
                                    <Td>{client.city}</Td>
                                    <Td>{client.city}</Td>
                                    <Td>{client.is_headquarter ? "Yes" : "No"}</Td>
                                    <Td>{client.headquarter_id}</Td>
                                </Tr>
                            );
                        })
                    }
                </Tbody>
            </Table>
        </Wrapper>
    );
}

export default Client;
