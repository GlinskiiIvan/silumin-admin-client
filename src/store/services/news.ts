import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface INewses {
    id: number;
    title: string;
    sub_title: string;
    date: Date;
    image: string;
}

interface INews {
    id: number;
    title: string;
    sub_title: string;
    content: string;
    date: Date;
    image: string;
}

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
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
    tagTypes: ['News'],
    endpoints: (builder) => ({
        getAllNews: builder.query<INewses[], void>({
            query: () => `/news`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'News' as const, id })),
                        { type: 'News', id: 'LIST' },
                    ]
                    : [{ type: 'News', id: 'LIST' }],
        }),

        getOneNews: builder.query<INews, number>({
            query: (id: number) => `/news/${id}`,
        }),

        createNews: builder.mutation<any, FormData>({
            query: (body) => ({
                url: '/news',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'News', id: 'LIST'}],
        }),

        updateNews: builder.mutation<any, {id: number, formData: FormData }>({
            query(data) {
                const {id, formData} = data;
                return {
                    url: `news/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{type: 'News', id: 'LIST'}],
        }),

        removeNews: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `news/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'News', id: 'LIST'}],
        }),
    }),
})