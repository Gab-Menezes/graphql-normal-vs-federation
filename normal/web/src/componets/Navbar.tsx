import { ArrowForwardIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Text, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuList, useDisclosure, Spacer, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import auth from "../utils/Auth";
import AccordionMenu from './AccordionMenu';
import AccordionMenuLink from './AccordionMenuLink';
import LinkMenuItem from './AccordionMenuLink';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {
    const { data } = useMeQuery();
    const [logout, { loading, client }] = useLogoutMutation();
    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <Flex zIndex={1} position="sticky" top={0} bg="#285E61" p={4}>
            <IconButton 
                aria-label="Open menus drawer" 
                icon={<HamburgerIcon />} 
                onClick={onOpen}
                variant="ghost"
            />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Menus</DrawerHeader>
                    <DrawerBody>
                        <Accordion allowMultiple>
                            <AccordionMenu label="Clients">
                                <AccordionMenuLink label="Clients" to="/clients" onClick={onClose}/>
                            </AccordionMenu>

                            <AccordionMenu label="Orders">
                                <AccordionMenuLink label="Orders" to="/orders"/>
                            </AccordionMenu>
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Flex flex={1} m="auto" align="center" maxW={800}>
                <Link as={RouterLink} to="/">
                    <Heading>Home</Heading>
                </Link>
                
                <Box ml={"auto"}>
                <Flex align="center">
                <Box mr={4}>{data ? data.me.name: ''}</Box>
                    <Button
                    onClick={async () => {
                        await logout();
                        await client.clearStore();
                        auth.access_token = "";
                        history.push("/login");
                    }}
                    isLoading={loading}
                    variant="link"
                    >
                        Logout
                    </Button>
                </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Navbar;
