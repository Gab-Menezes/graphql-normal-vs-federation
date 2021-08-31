import React from 'react';
import { useClientsQuery } from '../generated/graphql';

interface OrderProps {

}

const Order: React.FC<OrderProps> = () => {
    useClientsQuery({
        variables: {
            pagination: {
                take: 30
            }
        },
    });

    return null;
}

export default Order;
