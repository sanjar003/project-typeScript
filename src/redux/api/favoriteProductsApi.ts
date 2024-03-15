import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants/constants";


interface ProductRequest {
    _id: number;

}

interface ProductResponse {
    _id: number;
    name: string;
    photoUrl: string;
    price: string;
    quantity: string;
}


export const favoriteProductsApi = createApi({
    reducerPath: "favoriteProductsApi",
    baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
    tagTypes: ["FavoriteProducts"],
    endpoints: (builder) => {
        return {
            getFavoriteProducts: builder.query<ProductResponse[], void>({
                query: () => ({
                    url: "favorites-products",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }),
                providesTags: ["FavoriteProducts"]
            }),
            toggleFavoriteProduct: builder.mutation<ProductResponse, ProductRequest>({
                query: (id) => ({
                    url: `favorites-products/${id}`,
                    method: "POST",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }

                }),
                invalidatesTags: ["FavoriteProducts"]
            })

        }
    }
})



export const { useGetFavoriteProductsQuery, useToggleFavoriteProductMutation } = favoriteProductsApi;