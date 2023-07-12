import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IEmployee {
    id: number;
    last_name: string;
    first_name: string;
    patronymic: string;
    position: string;
}

interface IContact {
    value: string;
    type: string;
}

interface IEmployeeFull extends IEmployee{
    contacts: IContact[]
}

interface IEmployeeCreateBody {
    last_name: string;
    first_name: string;
    patronymic: string;
    position: string;
    contacts: string;
}

interface IEmployeeUpdateBody {
    id?: number;
    last_name?: string;
    first_name?: string;
    patronymic?: string;
    position?: string;
    contacts?: string;
}

export const employeesAPI = createApi({
    reducerPath: 'employeesAPI',
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
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getAllEmployees: builder.query<IEmployee[], void>({
            query: () => `/employees`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Employees' as const, id })),
                        { type: 'Employees', id: 'LIST' },
                    ]
                    : [{ type: 'Employees', id: 'LIST' }],
        }),

        getOneEmployee: builder.query<IEmployeeFull, number>({
            query: (id: number) => `/employees/${id}`,
        }),

        createEmployee: builder.mutation<any, IEmployeeCreateBody>({
            query: (body) => ({
                url: '/employees',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Employees', id: 'LIST'}],
        }),

        updateEmployee: builder.mutation<any, IEmployeeUpdateBody>({
            query(data) {
                const {id, ...body} = data;
                return {
                    url: `employees/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{type: 'Employees', id: 'LIST'}],
        }),

        removeEmployee: builder.mutation<any, { id: number }>({
            query({id}) {
                return {
                    url: `employees/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Employees', id: 'LIST'}],
        }),
    }),
})