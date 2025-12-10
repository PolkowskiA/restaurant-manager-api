/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getAllUsers as Query_getAllUsers } from './../graphql/user/resolvers/Query/getAllUsers';
import    { getCurrentUser as Query_getCurrentUser } from './../graphql/user/resolvers/Query/getCurrentUser';
import    { login as Mutation_login } from './../graphql/auth/resolvers/Mutation/login';
import    { register as Mutation_register } from './../graphql/auth/resolvers/Mutation/register';
import    { GetCurrentUserResponse } from './../graphql/user/resolvers/GetCurrentUserResponse';
import    { LoginResponse } from './../graphql/auth/resolvers/LoginResponse';
import    { RegisterResponse } from './../graphql/auth/resolvers/RegisterResponse';
import    { User } from './../graphql/user/resolvers/User';
import    { BaseResponse } from './../graphql/auth/resolvers/BaseResponse';
    export const resolvers: Resolvers = {
      Query: { getAllUsers: Query_getAllUsers,getCurrentUser: Query_getCurrentUser },
      Mutation: { login: Mutation_login,register: Mutation_register },
      
      GetCurrentUserResponse: GetCurrentUserResponse,
LoginResponse: LoginResponse,
RegisterResponse: RegisterResponse,
User: User,
BaseResponse: BaseResponse
    }