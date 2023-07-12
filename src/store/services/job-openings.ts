import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IJobOpening {
    id: number;
    name: string;
}

interface IJobOpeningFull extends IJobOpening{
    description?: string;
    requirements: {id: number, value: string}[];
    duties: {id: number, value: string}[];
}

interface IJobOpeningCreateBody {
    name: string;
    description?: string;
    requirements: string;
    duties: string;
}

interface IJobOpeningUpdateBody {
    id: number;
    name?: string;
    description?: string;
    requirements?: string;
    duties?: string;
}

export const jobOpeningsAPI = createApi({
    reducerPath: 'jobOpeningsAPI',
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
    tagTypes: ['JobOpenings'],
    endpoints: (builder) => ({
        getAllJobOpenings: builder.query<IJobOpening[], void>({
            query: () => `/job-openings`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'JobOpenings' as const, id })),
                        { type: 'JobOpenings', id: 'LIST' },
                    ]
                    : [{ type: 'JobOpenings', id: 'LIST' }],
        }),

        getOneJobOpening: builder.query<IJobOpeningFull, number>({
            query: (id: number) => `/job-openings/${id}`,
        }),

        createJobOpening: builder.mutation<any, IJobOpeningCreateBody>({
            query: (body) => ({
                url: '/job-openings',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'JobOpenings', id: 'LIST'}],
        }),

        updateJobOpening: builder.mutation<any, IJobOpeningUpdateBody>({
            query(data) {
                const {id, ...body} = data;
                return {
                    url: `job-openings/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'JobOpenings', id: 'LIST'}],
        }),

        removeJobOpening: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `job-openings/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'JobOpenings', id: 'LIST'}],
        }),
    }),
})