import React from "react"
import { Box } from '@chakra-ui/layout';

interface WrapperProps {
    variant?: "400px" | "800px" | "1200px"
}

const Wrapper: React.FC<WrapperProps> = ({children, variant = "800px"}) => {
    return (
    <Box mt={8} mx="auto" maxW={variant} w="100%">
        {children}
    </Box>
    );
}

export default Wrapper;
