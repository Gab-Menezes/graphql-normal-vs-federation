import { ApolloClient, ApolloLink, createHttpLink, from, gql, InMemoryCache, NextLink, Operation } from "@apollo/client";
import auth from "./utils/Auth";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getRefreshRequest } from "./utils/refreshToken";

const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`;

const httpLink = createHttpLink({
    uri: 'http://host.docker.internal:4000/graphql',
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

// const refreshMiddleware = new TokenRefreshLink({
//     accessTokenField: 'access_token',
//     isTokenValidOrUndefined: () => {
//         return auth.isTokenValidOrUndefined();
//     },
//     fetchAccessToken: () => {
//         console.log("Fetching Token from MIDDLEWARE");
//         return getRefreshRequest();
//     },
//     handleFetch: (access_token: string) => {
//         auth.access_token = access_token;
//     },
//     handleError: (err: Error) => {
//         console.log("Refresh token is invalid. Try to relogin.");
//         console.log(err);
//         Client.mutate({mutation: LOGOUT_MUTATION});
//         Client.clearStore();
//         auth.access_token = "";
//         window.location.href = "/login"
//     },
// });

class RefreshTokenLink extends ApolloLink {
    private _field: string;

    constructor(field: string) {
        super();

        this._field = field;
    }

    public request(operation: Operation, forward: NextLink)  {
        if (auth.isTokenValidOrUndefined()) return forward(operation);

        getRefreshRequest()
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            const token = (data?.[this._field] as string|null);
            if (!token) throw new Error("[Token Refresh Link]: Unable to retrieve new access token");

            auth.access_token = token;
        })
        .catch(_ => {
            Client.mutate({mutation: LOGOUT_MUTATION});
            Client.clearStore();
            auth.access_token = "";
            window.location.href = "/login"
        })
        return forward(operation);
    }
}

const refreshMiddleware = new RefreshTokenLink("access_token");

const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
        refreshMiddleware,
        authMiddleware,
        httpLink
    ])
})

export default Client
