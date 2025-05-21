//import { SQLiteDatabase } from "expo-sqlite";

//export type ISODateString = string;
export type Boolean3state = boolean | null;
export type StringOrNull = string | null;
export type StringOrNullOrEmpty = string | null | "";
export type Dictionary<T> = { [key: string]: T };
//export type DateTime = number | string;   // datetime are stored as number, date-only as ISO 8601 strings
// todo: DateTime type should be moved to database-specific types, dates in the app should be Date or null
export type DateTime = number;   // datetime are stored always as number
export const NO_DateTime: DateTime = 0;
export type Money = number; // we don't use a wrapper type to remain light, instead use number

// export type DbWithPayload<TPayload> = {
//   db: SQLiteDatabase;
//   payload: TPayload;
// };

//export type DbWithPayload2<TPayload> = { db: SQLiteDatabase } & TPayload;

