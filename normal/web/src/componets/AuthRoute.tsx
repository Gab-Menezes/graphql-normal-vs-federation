import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import auth from "../utils/Auth"
import Navbar from './Navbar';

type AuthRouteProps = RouteProps;

const AuthRoute: React.FC<AuthRouteProps> = ({component, ...rest}) => {
    if (!auth.isTokenValid()) return <Redirect to="/login"/>

    const Component = component as any;
    return(
    <>
        <Navbar/>
        <Route 
            {...rest} 
            render={ (props) => <Component {...props} /> } 
        />
    </>
    );
}

export default AuthRoute;
