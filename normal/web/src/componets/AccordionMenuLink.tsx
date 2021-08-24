import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Link, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface AccordionMenuLinkProps extends LinkProps {
    label: string
}

const AccordionMenuLink: React.FC<AccordionMenuLinkProps> = ({ label, onClick, ...props }) => {
    return (
        <Link as={RouterLink} {...props} onClick={onClick}>
            <Flex>
                <Text fontSize="xl" ml="4">
                    {label} 
                </Text>
                <Spacer />
                <ArrowForwardIcon />
            </Flex>
        </Link>
    );
}

export default AccordionMenuLink;
