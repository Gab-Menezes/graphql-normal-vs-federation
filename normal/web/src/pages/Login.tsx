import { Box, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import InputField from '../componets/InputField';
import Wrapper from '../componets/Wrapper';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import auth from '../utils/Auth';

interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = ({history}) => {
    const [login, {client}] = useLoginMutation();
    const [msg, setMsg] = useState("");

    if (auth.isTokenValid()) return <Redirect to="/"/>

    return(        
        <Wrapper variant="400px">
            <Formik 
            initialValues={{username: '', password: ''}} 
            onSubmit={async (values) => {
                try {
                    const {data} = await login({variables: values});
                    if (data?.login.error)
                        if (data.login.error.execution)
                            setMsg(data.login.error.execution)

                    if (data?.login.item) {
                        auth.access_token = data.login.item.access_token;                        
                        client.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {me: data.login.item.user}
                        });
                        history.push("/");
                    }
                } catch(err) {
                    console.log(err)
                }
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField 
                            name="username" 
                            placeholder="username" 
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField 
                                name="password" 
                                placeholder="password" 
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button mt={4} type="submit" colorScheme="blue" isLoading={isSubmitting}>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
            {
            msg === "" ? 
                null : 
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle>{msg}</AlertTitle>
                </Alert>
            }
        </Wrapper>
    );
}

export default Login;
