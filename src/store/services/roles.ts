import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {REACT_APP_API_URL} from "../../utils/constants";
import {IUsers} from "./users";
import {RootState} from "../store";

export interface IRoles {
    id: number,
    value: string,
    description: string
}

export interface IRole {
    id: number,
    value: string,
    description: string
    users: IUsers[],
}

interface ICreateRoleBody {
    value: string,
    description: string,
    users?: string,
}

interface IUpdateRoleBody {
    id: number,
    value?: string,
    description?: string,
    users?: string,
}

export const rolesAPI = createApi({
    reducerPath: 'rolesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_API_URL,
        prepareHeaders: (headers ) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getAllRoles: builder.query<IRoles[], void>({
            query: () => `/roles`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Roles' as const, id })),
                        { type: 'Roles', id: 'LIST' },
                    ]
                    : [{ type: 'Roles', id: 'LIST' }],
        }),

        getOneRole: builder.query<IRole, number>({
            query: (id: number) => `/roles/${id}`,
        }),

        createRole: builder.mutation<any, ICreateRoleBody>({
            query: (body) => ({
                url: '/roles',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Roles', id: 'LIST'}],
        }),

        updateRole: builder.mutation<any, IUpdateRoleBody>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `roles/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'Roles', id: 'LIST'}],
        }),

        removeRole: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `roles/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Roles', id: 'LIST'}],
        }),
    }),
})
export const {  } = rolesAPI;