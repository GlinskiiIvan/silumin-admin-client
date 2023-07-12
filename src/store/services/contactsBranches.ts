import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IContactsBranches {
    id: number;
    city: string;
    name: string;
    address: string;
}

interface IContact {
    value: string;
    type: string;
}

interface IContactsBranchesFull extends IContactsBranches{
    contacts: IContact[]
}

interface IContactsBranchesCreateBody {
    city: string;
    name: string;
    address: string;
}

interface IContactsBranchesUpdateBody {
    id?: number;
    city: string;
    name: string;
    address: string;
    contacts?: string;
}

const URL = 'contacts-branches';

export const contactsBranchesAPI = createApi({
    reducerPath: 'contactsBranchesAPI',
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
    tagTypes: ['ContactsBranches'],
    endpoints: (builder) => ({
        getAllContactsBranches: builder.query<IContactsBranches[], void>({
            query: () => `/${URL}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'ContactsBranches' as const, id })),
                        { type: 'ContactsBranches', id: 'LIST' },
                    ]
                    : [{ type: 'ContactsBranches', id: 'LIST' }],
        }),

        getOneContactsBranches: builder.query<IContactsBranchesFull, number>({
            query: (id: number) => `/${URL}/${id}`,
        }),

        createContactsBranches: builder.mutation<any, IContactsBranchesCreateBody>({
            query: (body) => ({
                url: `/${URL}`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'ContactsBranches', id: 'LIST'}],
        }),

        updateContactsBranches: builder.mutation<any, IContactsBranchesUpdateBody>({
            query(data) {
                const {id, ...body} = data;
                return {
                    url: `${URL}/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'ContactsBranches', id: 'LIST'}],
        }),

        removeContactsBranches: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `${URL}/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'ContactsBranches', id: 'LIST'}],
        }),
    }),
})