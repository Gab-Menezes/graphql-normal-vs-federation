import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import React from 'react';

interface AccordionMenuProps {
    label: string
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ label, children }) => {
    return (
        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    <Text fontSize="xl">
                        {label}
                    </Text>
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                    {children}
            </AccordionPanel>
        </AccordionItem>
    );
}

export default AccordionMenu;
