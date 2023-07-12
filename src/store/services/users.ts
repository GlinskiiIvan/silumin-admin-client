import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IUsers {
    id: number,
    name: string
}

interface IUser {
    id: number,
    name: string,
    roles: [{ id: number, value: string, description: string }]
}

interface ICreateUserBody {
    name: string,
    password: string,
    roles: string;
}

interface IUpdateUserBody {
    id: number,
    name?: string,
    password?: string,
    roles?: string;
}

interface ICreateUserRes {
    token: string,
}

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URI,
        prepareHeaders: (headers ) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUsers[], void>({
            query: () => `/users`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Users' as const, id })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),

        getOneUser: builder.query<IUser, number>({
            query: (id: number) => `/users/${id}`,
        }),

        createUser: builder.mutation<ICreateUserRes, ICreateUserBody>({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}],
        }),

        updateUser: builder.mutation<any, IUpdateUserBody>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `users/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'Users', id: 'LIST'}],
        }),

        removeUser: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `users/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Users', id: 'LIST'}],
        }),
    }),
})