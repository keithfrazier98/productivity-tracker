import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql, ClientError } from "graphql-request";

//https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#graphql-basequery
const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  //TODO:Update base url with real url
  baseQuery: graphqlBaseQuery({ baseUrl: "/" }),
  tagTypes: ["GOALS", "SETTINGS"],
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: () => ({
        body: gql`
          query {
            goals {
              name
              type
            }
          }
        `,
      }),
    }),
    // declare endpoints in API slice to conform TS requirement
    // injectEndpoints in seperate feature slices (see feature endpoint files)
  }),
});

export const { endpoints } = apiSlice;
