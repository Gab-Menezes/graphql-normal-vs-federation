import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library. */
  Decimal: any;
};

export type Client = {
  id: Scalars['Int'];
  name: Scalars['String'];
  city: Scalars['String'];
  state: States;
  is_headquarter: Scalars['Boolean'];
  headquarter_id?: Maybe<Scalars['Int']>;
  headquarter?: Maybe<Client>;
  branches: Array<Client>;
  orders: Array<Order>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type ClientInput = {
  name: Scalars['String'];
  state: States;
  city: Scalars['String'];
  headquarter_id?: Maybe<Scalars['Int']>;
  is_headquarter: Scalars['Boolean'];
};

export type ClientResponse = {
  item?: Maybe<Client>;
  error?: Maybe<ErrorResponse>;
};



export type ErrorResponse = {
  fields?: Maybe<Array<FieldError>>;
  execution?: Maybe<Scalars['String']>;
};

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Login = {
  access_token: Scalars['String'];
  user: User;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  item?: Maybe<Login>;
  error?: Maybe<ErrorResponse>;
};

export type Mutation = {
  createClient: ClientResponse;
  deleteClient: Scalars['Boolean'];
  deleteClients: Scalars['Int'];
  updateClient: ClientResponse;
  changeHeadquarter: ClientResponse;
  createOrder: OrderResponse;
  createProduct: ProductResponse;
  deleteProduct: Scalars['Boolean'];
  createUser: UserResponse;
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokens: Scalars['Boolean'];
};


export type MutationCreateClientArgs = {
  input: ClientInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteClientsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationUpdateClientArgs = {
  input: UpdateClientInput;
  id: Scalars['Int'];
};


export type MutationChangeHeadquarterArgs = {
  newId: Scalars['Int'];
};


export type MutationCreateOrderArgs = {
  products_order_input: Array<ProductOrderInput>;
  order_input: OrderInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRevokeRefreshTokensArgs = {
  id: Scalars['Int'];
};

export type Order = {
  id: Scalars['ID'];
  final_price: Scalars['Decimal'];
  client_id: Scalars['Int'];
  client: Client;
  products_order: Array<ProductOrder>;
  status: Status;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type OrderInput = {
  client_id: Scalars['Int'];
  status: Status;
};

export type OrderResponse = {
  item?: Maybe<Order>;
  error?: Maybe<ErrorResponse>;
};

export type PaginateInput = {
  cursor?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type PaginatedClient = {
  items: Array<Client>;
  pagination: PaginetedObject;
};

export type PaginatedClientResponse = PaginatedClient | ErrorResponse;

export type PaginatedOrderResponse = {
  items: Array<Order>;
  pagination?: Maybe<PaginetedObject>;
  error?: Maybe<ErrorResponse>;
};

export type PaginatedProductResponse = {
  items: Array<Product>;
  pagination?: Maybe<PaginetedObject>;
  error?: Maybe<ErrorResponse>;
};

export type PaginatedUserResponse = {
  items: Array<User>;
  pagination?: Maybe<PaginetedObject>;
  error?: Maybe<ErrorResponse>;
};

export type PaginetedObject = {
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  hasLess: Scalars['Boolean'];
  cursor?: Maybe<Scalars['Int']>;
};

export type Product = {
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Decimal'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Decimal'];
};

export type ProductOrder = {
  id: Scalars['ID'];
  product_id: Scalars['Int'];
  product: Product;
  order_id: Scalars['Int'];
  order: Order;
  amount: Scalars['Int'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type ProductOrderInput = {
  product_id: Scalars['Int'];
  amount: Scalars['Int'];
};

export type ProductResponse = {
  item?: Maybe<Product>;
  error?: Maybe<ErrorResponse>;
};

export type Query = {
  clients: PaginatedClientResponse;
  client?: Maybe<Client>;
  orders: PaginatedOrderResponse;
  order: OrderResponse;
  products: PaginatedProductResponse;
  product: ProductResponse;
  users: PaginatedUserResponse;
  user: UserResponse;
  me: User;
};


export type QueryClientsArgs = {
  pagination?: Maybe<PaginateInput>;
};


export type QueryClientArgs = {
  id: Scalars['Int'];
};


export type QueryOrdersArgs = {
  pagination?: Maybe<PaginateInput>;
  client_id?: Maybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  paginate?: Maybe<PaginateInput>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  pagination?: Maybe<PaginateInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

/** Code of each state */
export enum States {
  Ac = 'AC',
  Al = 'AL',
  Ap = 'AP',
  Am = 'AM',
  Ba = 'BA',
  Ce = 'CE',
  Df = 'DF',
  Es = 'ES',
  Go = 'GO',
  Ma = 'MA',
  Mt = 'MT',
  Ms = 'MS',
  Mg = 'MG',
  Pa = 'PA',
  Pb = 'PB',
  Pr = 'PR',
  Pe = 'PE',
  Pi = 'PI',
  Rj = 'RJ',
  Rn = 'RN',
  Rs = 'RS',
  Ro = 'RO',
  Rr = 'RR',
  Sc = 'SC',
  Sp = 'SP',
  Se = 'SE',
  To = 'TO'
}

/** Status of an order */
export enum Status {
  Pending = 'PENDING',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED'
}

export type UpdateClientInput = {
  name?: Maybe<Scalars['String']>;
  state?: Maybe<States>;
  city?: Maybe<Scalars['String']>;
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type UserInput = {
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  item?: Maybe<User>;
  error?: Maybe<ErrorResponse>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: { __typename: 'LoginResponse', item?: Maybe<{ access_token: string, user: { id: string, name: string, username: string } }>, error?: Maybe<{ execution?: Maybe<string>, fields?: Maybe<Array<{ field: string, message: string }>> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type ClientsQueryVariables = Exact<{
  pagination?: PaginateInput;
}>;


export type ClientsQuery = { clients: { __typename: 'PaginatedClient', items: Array<{ id: number, name: string, city: string, state: States, is_headquarter: boolean, headquarter_id?: Maybe<number>, headquarter?: Maybe<{ name: string }> }>, pagination: { total: number, hasMore: boolean, hasLess: boolean, cursor?: Maybe<number> } } | { __typename: 'ErrorResponse', fields?: Maybe<Array<{ field: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, name: string, username: string } };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    __typename
    item {
      access_token
      user {
        id
        name
        username
      }
    }
    error {
      execution
      fields {
        field
        message
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ClientsDocument = gql`
    query Clients($pagination: PaginateInput! = {}) {
  clients(pagination: $pagination) {
    __typename
    ... on PaginatedClient {
      items {
        id
        name
        city
        state
        is_headquarter
        headquarter_id
        headquarter {
          name
        }
      }
      pagination {
        total
        hasMore
        hasLess
        cursor
      }
    }
    ... on ErrorResponse {
      fields {
        field
        message
      }
    }
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export type ClientKeySpecifier = ('id' | 'name' | 'city' | 'state' | 'is_headquarter' | 'headquarter_id' | 'headquarter' | 'branches' | 'orders' | 'created_at' | 'updated_at' | ClientKeySpecifier)[];
export type ClientFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	is_headquarter?: FieldPolicy<any> | FieldReadFunction<any>,
	headquarter_id?: FieldPolicy<any> | FieldReadFunction<any>,
	headquarter?: FieldPolicy<any> | FieldReadFunction<any>,
	branches?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClientResponseKeySpecifier = ('item' | 'error' | ClientResponseKeySpecifier)[];
export type ClientResponseFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ErrorResponseKeySpecifier = ('fields' | 'execution' | ErrorResponseKeySpecifier)[];
export type ErrorResponseFieldPolicy = {
	fields?: FieldPolicy<any> | FieldReadFunction<any>,
	execution?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FieldErrorKeySpecifier = ('field' | 'message' | FieldErrorKeySpecifier)[];
export type FieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginKeySpecifier = ('access_token' | 'user' | LoginKeySpecifier)[];
export type LoginFieldPolicy = {
	access_token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginResponseKeySpecifier = ('item' | 'error' | LoginResponseKeySpecifier)[];
export type LoginResponseFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createClient' | 'deleteClient' | 'deleteClients' | 'updateClient' | 'changeHeadquarter' | 'createOrder' | 'createProduct' | 'deleteProduct' | 'createUser' | 'deleteUser' | 'login' | 'logout' | 'revokeRefreshTokens' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createClient?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteClient?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteClients?: FieldPolicy<any> | FieldReadFunction<any>,
	updateClient?: FieldPolicy<any> | FieldReadFunction<any>,
	changeHeadquarter?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	createProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	revokeRefreshTokens?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('id' | 'final_price' | 'client_id' | 'client' | 'products_order' | 'status' | 'created_at' | 'updated_at' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	final_price?: FieldPolicy<any> | FieldReadFunction<any>,
	client_id?: FieldPolicy<any> | FieldReadFunction<any>,
	client?: FieldPolicy<any> | FieldReadFunction<any>,
	products_order?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderResponseKeySpecifier = ('item' | 'error' | OrderResponseKeySpecifier)[];
export type OrderResponseFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedClientKeySpecifier = ('items' | 'pagination' | PaginatedClientKeySpecifier)[];
export type PaginatedClientFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	pagination?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedOrderResponseKeySpecifier = ('items' | 'pagination' | 'error' | PaginatedOrderResponseKeySpecifier)[];
export type PaginatedOrderResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	pagination?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedProductResponseKeySpecifier = ('items' | 'pagination' | 'error' | PaginatedProductResponseKeySpecifier)[];
export type PaginatedProductResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	pagination?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedUserResponseKeySpecifier = ('items' | 'pagination' | 'error' | PaginatedUserResponseKeySpecifier)[];
export type PaginatedUserResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	pagination?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginetedObjectKeySpecifier = ('total' | 'hasMore' | 'hasLess' | 'cursor' | PaginetedObjectKeySpecifier)[];
export type PaginetedObjectFieldPolicy = {
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	hasLess?: FieldPolicy<any> | FieldReadFunction<any>,
	cursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('id' | 'name' | 'price' | 'created_at' | 'updated_at' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductOrderKeySpecifier = ('id' | 'product_id' | 'product' | 'order_id' | 'order' | 'amount' | 'created_at' | 'updated_at' | ProductOrderKeySpecifier)[];
export type ProductOrderFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	product_id?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	order_id?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductResponseKeySpecifier = ('item' | 'error' | ProductResponseKeySpecifier)[];
export type ProductResponseFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('clients' | 'client' | 'orders' | 'order' | 'products' | 'product' | 'users' | 'user' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	clients?: FieldPolicy<any> | FieldReadFunction<any>,
	client?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'name' | 'username' | 'created_at' | 'updated_at' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResponseKeySpecifier = ('item' | 'error' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Client?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClientKeySpecifier | (() => undefined | ClientKeySpecifier),
		fields?: ClientFieldPolicy,
	},
	ClientResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClientResponseKeySpecifier | (() => undefined | ClientResponseKeySpecifier),
		fields?: ClientResponseFieldPolicy,
	},
	ErrorResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ErrorResponseKeySpecifier | (() => undefined | ErrorResponseKeySpecifier),
		fields?: ErrorResponseFieldPolicy,
	},
	FieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FieldErrorKeySpecifier | (() => undefined | FieldErrorKeySpecifier),
		fields?: FieldErrorFieldPolicy,
	},
	Login?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginKeySpecifier | (() => undefined | LoginKeySpecifier),
		fields?: LoginFieldPolicy,
	},
	LoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginResponseKeySpecifier | (() => undefined | LoginResponseKeySpecifier),
		fields?: LoginResponseFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderResponseKeySpecifier | (() => undefined | OrderResponseKeySpecifier),
		fields?: OrderResponseFieldPolicy,
	},
	PaginatedClient?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedClientKeySpecifier | (() => undefined | PaginatedClientKeySpecifier),
		fields?: PaginatedClientFieldPolicy,
	},
	PaginatedOrderResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedOrderResponseKeySpecifier | (() => undefined | PaginatedOrderResponseKeySpecifier),
		fields?: PaginatedOrderResponseFieldPolicy,
	},
	PaginatedProductResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedProductResponseKeySpecifier | (() => undefined | PaginatedProductResponseKeySpecifier),
		fields?: PaginatedProductResponseFieldPolicy,
	},
	PaginatedUserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedUserResponseKeySpecifier | (() => undefined | PaginatedUserResponseKeySpecifier),
		fields?: PaginatedUserResponseFieldPolicy,
	},
	PaginetedObject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginetedObjectKeySpecifier | (() => undefined | PaginetedObjectKeySpecifier),
		fields?: PaginetedObjectFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	ProductOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductOrderKeySpecifier | (() => undefined | ProductOrderKeySpecifier),
		fields?: ProductOrderFieldPolicy,
	},
	ProductResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductResponseKeySpecifier | (() => undefined | ProductResponseKeySpecifier),
		fields?: ProductResponseFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier),
		fields?: UserResponseFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;