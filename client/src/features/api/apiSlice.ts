import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponseType {
  rowCount: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface ItemForHompage {
  item_id: string;
  product_name: string;
  image_url: string;
  price: number;
}

export interface ItemDetails {
  item_id: string;
  product_name: string;
  image_url: string[];
  price: number;
  description: string;
  category: string;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllItems: builder.query<ApiResponseType, void>({
      query: () => "items",
    }),
    getItem: builder.query<ApiResponseType, string>({
      query: (itemId) => `items/${itemId}`,
    }),
  }),
});

export const { useGetAllItemsQuery, useGetItemQuery } = apiSlice;
