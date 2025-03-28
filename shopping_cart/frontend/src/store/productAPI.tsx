import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
    reducerPath:'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints:(builder)=>({
        getAllProducts: builder.query({
            query: ()=> "products",
        }),
    }),
});

export const { useGetAllProductsQuery } = productsAPI; 