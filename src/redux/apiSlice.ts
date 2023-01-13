import { createApi } from "@reduxjs/toolkit/query/react";
import { request, ClientError } from "graphql-request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  activeGoalPattern,
  entryMetaPattern,
  entryPattern,
  Goal,
  goalPattern,
  GoalTypes,
  NativeQueryTypes,
  progressPattern,
} from "../types";
import { getCheckMatch } from "../utils";

const {
  getItem: getNativeItem,
  setItem: setNativeItem,
  multiGet: getNativeItems,
  multiSet: setNativeItems,
} = AsyncStorage;

const { isArray } = Array;
const { stringify } = JSON;

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

const nativeBaseQuery =
  () =>
  async ([nativeAccessKey, queryType, value]: [
    string | string[],
    NativeQueryTypes,
    (string | string[] | Goal[])?
  ]) => {
    const checkMatch = getCheckMatch(nativeAccessKey);
    const keyIsArray = isArray(nativeAccessKey);
    const valueIsArray = isArray(value);

    /**Sets native item if there is a single key and an array value, or else does nothing.*/
    const setArrayItem = async () => {
      if (!keyIsArray && valueIsArray) {
        return {
          data: await setNativeItem(nativeAccessKey, stringify(value)),
        };
      }
    };

    /**Sets native items if there is multiple keys and multiple values. Indexes are mapped to
     * like indexes between the arrays.
     */
    const setArrayItems = async () => {
      if (keyIsArray && valueIsArray) {
        const goalPairs: [string, string][] = nativeAccessKey.map((key, i) => [
          key,
          stringify(value[i]),
        ]);
        return { data: await setNativeItems(goalPairs) };
      }
    };

    let itemSet;
    switch (queryType) {
      case "Entry":
        checkMatch(entryPattern);
        break;
      case "EntryMetadata":
        checkMatch(entryMetaPattern);
        itemSet = setArrayItem();
        break;
      case "Goal":
        checkMatch(goalPattern);
        itemSet = setArrayItems();
        break;
      case "Progress":
        checkMatch(progressPattern);
        break;
      case "ActiveGoals":
        checkMatch(activeGoalPattern);
        itemSet = setArrayItem();
        break;
      default:
        throw new Error("Invalid queryType");
    }

    if (itemSet) return itemSet;

    if (keyIsArray) {
      return { data: await getNativeItems(nativeAccessKey) };
    } else if (value && !isArray(value)) {
      return { data: await setNativeItem(nativeAccessKey, value) };
    } else {
      return { data: await getNativeItem(nativeAccessKey) };
    }
  };

const goalIdToKeys = (goals: string[]) => goals.map((id) => `@goal_${id}`);

export const nativeApiSlice = createApi({
  reducerPath: "api",
  //TODO:Update base url with real url
  baseQuery: nativeBaseQuery(),
  tagTypes: ["GOALS", "ENTRIES", "PROGRESS", "ENTRY_METADATA", "ACTIVE_GOALS"],
  endpoints: (builder) => ({
    /**Gets an array of active goals given a goal type. */
    getActiveGoals: builder.query({
      query: (goalType: GoalTypes) => {
        return [`${goalType}Goals`, "ActiveGoals"];
      },
    }),
    getGoals: builder.query({
      query: (goals: string[]) => {
        goals = goalIdToKeys(goals);
        return [goals, "Goal"];
      },
    }),
    setActiveGoals: builder.query({
      query: (activeGoals: string[]) => {
        return [activeGoals, "ActiveGoals"];
      },
    }),
    setGoals: builder.query({
      query: (goals: { [goalId: string]: Goal }) => {
        const goalKeys = goalIdToKeys(Object.keys(goals));
        return [goalKeys, "Goal", Object.values(goals)];
      },
    }),
    // declare endpoints in API slice to conform TS requirement
    // injectEndpoints in seperate feature slices (see feature endpoint files)
  }),
});

export const { endpoints } = nativeApiSlice;
