import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface AccordionMenuLinkProps extends LinkProps {
    label: string
}

const AccordionMenuLink: React.FC<AccordionMenuLinkProps> = ({ label, onClick, ...props }) => {
    return (
        <Link as={RouterLink} {...props} onClick={onClick}>
            <Flex>
                <Box>
                    <Text fontSize="xl">
                        {label} 
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <ArrowForwardIcon />
                </Box>
            </Flex>
        </Link>
    );
}

export default AccordionMenuLink;
