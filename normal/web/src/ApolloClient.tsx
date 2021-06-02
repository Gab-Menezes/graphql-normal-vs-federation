import { createHttpLink, ApolloLink, ApolloClient, InMemoryCache, from, gql } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getRefreshRequest } from "./utils/refreshToken";
import auth from "./utils/Auth"

const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`;

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: "include"
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = auth.access_token;
    if (token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }

    return forward(operation);
})

const refreshMiddleware = new TokenRefreshLink({
    accessTokenField: 'access_token',
    isTokenValidOrUndefined: () => {
        return auth.isTokenValidOrUndefined();
    },
    fetchAccessToken: () => {
        console.log("Fetching Token from MIDDLEWARE");
        return getRefreshRequest();
    },
    handleFetch: (access_token: string) => {
        auth.access_token = access_token;
    },
    handleError: (err: Error) => {
        console.log("Refresh token is invalid. Try to relogin.");
        console.log(err);
        Client.mutate({mutation: LOGOUT_MUTATION});
        Client.clearStore();
        auth.access_token = "";
        window.location.href = "/login"
    },
});

const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
        refreshMiddleware,
        authMiddleware,
        httpLink
    ])
})

export default Client
