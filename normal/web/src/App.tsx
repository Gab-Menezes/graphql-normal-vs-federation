import { ApolloProvider } from "@apollo/client"
// import { ChakraProvider, theme } from "@chakra-ui/react"
import { ChakraProvider, extendTheme, Link } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Client from "./ApolloClient"
import { Routes } from "./componets/Routes"
import auth from "./utils/Auth"
import { getRefreshRequest } from "./utils/refreshToken"



export const App = () => {    
    const [loading, setLoading] = useState(true);
    const theme = extendTheme({ components: { 
            Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
            Link: { baseStyle: { _focus: { boxShadow: 'none' } } } 
        } 
    })
    

    useEffect(() => {
        getRefreshRequest()
            .then(async resp => {
                const json = await resp.json();
                auth.access_token = json.access_token;
                setLoading(false);
            })
    }, []);

    if (loading) return <div>loading...</div>


    return (
        <ChakraProvider theme={theme}>
            <ApolloProvider client={Client}>
                <Routes/>
            </ApolloProvider>
        </ChakraProvider>
    )
}
