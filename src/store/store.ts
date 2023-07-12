import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'
import {rolesAPI} from "./services/roles";
import {usersAPI} from "./services/users";
import {licenseAPI} from "./services/licenses";
import {newsAPI} from "./services/news";
import {requirementsAPI} from "./services/requirements";
import {jobOpeningsAPI} from "./services/job-openings";
import {employeesAPI} from "./services/employees";
import {contactsBranchesAPI} from "./services/contactsBranches";
import {userReducer} from "./slices/user";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [rolesAPI.reducerPath]: rolesAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [licenseAPI.reducerPath]: licenseAPI.reducer,
        [newsAPI.reducerPath]: newsAPI.reducer,
        [requirementsAPI.reducerPath]: requirementsAPI.reducer,
        [jobOpeningsAPI.reducerPath]: jobOpeningsAPI.reducer,
        [employeesAPI.reducerPath]: employeesAPI.reducer,
        [employeesAPI.reducerPath]: employeesAPI.reducer,
        [contactsBranchesAPI.reducerPath]: contactsBranchesAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            pokemonApi.middleware,
            rolesAPI.middleware,
            usersAPI.middleware,
            licenseAPI.middleware,
            newsAPI.middleware,
            requirementsAPI.middleware,
            jobOpeningsAPI.middleware,
            employeesAPI.middleware,
            contactsBranchesAPI.middleware,
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;