import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants/constants";


interface ProductRequest {
    name: string;
    photoUrl: string;
    price: string;
    quantity: string;
}

interface ProductResponse {
    _id: number;
    name: string;
    photoUrl: string;
    price: string;
    quantity: string;
}


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
    tagTypes: ["Products"],
    endpoints: (builder) => {
        return {
            getProducts: builder.query<ProductResponse[], void>({
                query: () => ({
                    url: "products",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }),
                providesTags: ["Products"]
            }),
            createProduct: builder.mutation<ProductResponse, ProductRequest>({
                query: (body) => ({
                    url: "products",
                    method: "POST",
                    body,
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }

                }),
                invalidatesTags: ["Products"]
            })

        }
    }
})



export const { useGetProductsQuery, useCreateProductMutation } = productsApi;