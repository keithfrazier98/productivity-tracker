import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql, ClientError } from "graphql-request";
import { Goal, GoalTypes, NativeQueryTypes } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

/**
 * Generates a fixed length random ID without an external dep:
 * https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript */
const idgen = () =>
  Date.now().toString(36) +
  Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(
    36
  );

/**
 * Regex for progress data, matches keys for day, month, or year progress queries.
 */
const progressPattern =
  /@points_(?:[0-1][1-9]\/)?(:?[0-3][1-9]\/)?[2-9][0-9][2-9][3-9]/;

/**Matches any string that starts with "@goal_" and ends with a 17 character string of
 * letters and numbers.
 */
const goalPattern = /@goal_[a-z0-9]{17}/;

/** Matches any string that starts with "@entry_" and ends with a number of infinate length.*/
const entryPattern = /@entry_\d+/;

/** Matches strings that start with "@entryMetadata_" and ends with a number of infinate length. */
const entryMetaPattern = /@entryMetadata_\d+/;

/** Matches strings that start with a GoalType and ends in "Goals" */
const activeGoalPattern = /@(Daily|Monthly|Yearly)Goals/;

const getCheckMatch = (key: string | string[]) => {
  return (regex: RegExp) => {
    const checkKey = (key: string) => {
      if (!regex.test(key)) throw new Error("Invalid nativeAccessKey");
    };

    if (isArray(key)) {
      key.forEach((item) => checkKey(item));
    } else {
      checkKey(key);
    }
  };
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

    switch (queryType) {
      case "Entry":
        checkMatch(entryPattern);
        break;
      case "EntryMetadata":
        checkMatch(entryMetaPattern);
        setArrayItem();
        break;
      case "Goal":
        checkMatch(goalPattern);
        setArrayItems()
        break;
      case "Progress":
        checkMatch(progressPattern);
        break;
      case "ActiveGoals":
        checkMatch(activeGoalPattern);
        setArrayItem();
        break;
      default:
        throw new Error("Invalid queryType");
    }

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
