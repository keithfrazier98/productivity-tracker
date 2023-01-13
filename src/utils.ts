import { Goal, GoalTypes } from "./types";

/**
 * Generates a fixed length random ID without an external dep:
 * https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript */
export const idgen = () =>
  Date.now().toString(36) +
  Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(
    36
  );

export const getRegexTester = (key: string | string[]) => {
  return (regex: RegExp) => {
    const checkKey = (key: string) => {
      if (!regex.test(key)) throw new Error("Invalid nativeAccessKey");
    };

    if (Array.isArray(key)) {
      key.forEach((item) => checkKey(item));
    } else {
      checkKey(key);
    }
  };
};

export const genNewGoal = (id: string, type: GoalTypes): Goal => {
  return {
    id,
    type,
    created: Date.now(),
    isActive: true,
    pointValue: 0,
    title: "New Goal",
  };
};


