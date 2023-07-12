import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {REACT_APP_API_URL} from "../../utils/constants";

interface IRequirement {
    id: number;
    value: string;
}

interface IRequirementCreateBody {
    value: string;
}

interface IRequirementUpdateBody {
    id: number;
    value: string;
}

export const requirementsAPI = createApi({
    reducerPath: 'requirementsAPI',
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
    tagTypes: ['Requirements'],
    endpoints: (builder) => ({
        getAllRequirements: builder.query<IRequirement[], void>({
            query: () => `/requirements`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Requirements' as const, id })),
                        { type: 'Requirements', id: 'LIST' },
                    ]
                    : [{ type: 'Requirements', id: 'LIST' }],
        }),

        getOneRequirement: builder.query<IRequirement, number>({
            query: (id: number) => `/requirements/${id}`,
        }),

        createRequirement: builder.mutation<any, IRequirementCreateBody>({
            query: (body) => ({
                url: '/requirements',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Requirements', id: 'LIST'}],
        }),

        updateRequirement: builder.mutation<any, IRequirementUpdateBody>({
            query(data) {
                const {id, ...body} = data;
                return {
                    url: `requirements/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'Requirements', id: 'LIST'}],
        }),

        removeRequirement: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `requirements/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Requirements', id: 'LIST'}],
        }),
    }),
})