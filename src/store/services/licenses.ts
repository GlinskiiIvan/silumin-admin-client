import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ILicenses {
    id: number;
    name: string;
}

export interface ILicenseItem {
    id: number;
    image: string;
}

interface ILicense {
    id: number;
    name: string;
    licenses: ILicenseItem[];
}

export const licenseAPI = createApi({
    reducerPath: 'licenseAPI',
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
    tagTypes: ['Licenses'],
    endpoints: (builder) => ({
        getAllLicenses: builder.query<ILicenses[], void>({
            query: () => `/licenses-category`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Licenses' as const, id })),
                        { type: 'Licenses', id: 'LIST' },
                    ]
                    : [{ type: 'Licenses', id: 'LIST' }],
        }),

        getOneLicense: builder.query<ILicense, number>({
            query: (id: number) => `/licenses-category/${id}`,
        }),

        createLicense: builder.mutation<any, FormData>({
            query: (body) => ({
                url: '/licenses-category',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Licenses', id: 'LIST'}],
        }),

        updateLicense: builder.mutation<any, {id: number, formData: FormData }>({
            query(data) {
                const {id, formData} = data;
                return {
                    url: `licenses-category/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{type: 'Licenses', id: 'LIST'}],
        }),

        removeLicense: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `licenses-category/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Licenses', id: 'LIST'}],
        }),
    }),
})