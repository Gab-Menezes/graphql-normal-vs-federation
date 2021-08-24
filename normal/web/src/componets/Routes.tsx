import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AuthRoute from "./AuthRoute";
import { Center, Text } from "@chakra-ui/react" 
import Client from "../pages/Client";

export const Routes: React.FC<{}> = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/login" component={Login}/>

            <AuthRoute exact={true} path="/" component={Dashboard}/> 
            <AuthRoute exact={true} path="/clients" component={Client}/> 

            <Route path="/" render={() => {
                return (
                    <Center h="500px">
                        <Text fontSize="6xl">404</Text>
                    </Center>
                )
            }}/> 
        </Switch>
    </BrowserRouter>
)
