import queryString from "query-string";
import { DateTime, Dictionary } from "./ts-types";

export const isString = (value: any) => typeof value === 'string';

export function clearDict<T>(accountsDict: Dictionary<T>) {
  Object.keys(accountsDict).forEach(key => delete accountsDict[key]);
}
export function clearDict2<T extends { [key: string]: any } | { [key: number]: any }>(dict: T) {
  Object.keys(dict).forEach(key => delete dict[key as keyof T]);
}


export function clearArray<T>(array: T[]) {
  array.splice(0, array.length);
}

export function mutateArrayRemoveElement(array: number[], element: number): boolean {
  if (!array || !array.length) { return false; }
  const elementIndex = array.indexOf(element);
  if (elementIndex === -1) { return false; }
  array.splice(elementIndex, 1);
  return true;
}

// Example usage:
// const x1 = 2;
// const x2 = 10;
// const N = 4;
// const evenSpacedNumbers = generateEvenSpacedNumbers(x1, x2, N);
// console.log(evenSpacedNumbers); // Output: [ 3.6, 5.2, 6.8, 8.4 ]
export function genEvenSpacedNumbers(N: number, x1: number, x2: number): number[] {
  const step = (x2 - x1) / (N + 1);
  const result = [];

  for (let i = 1; i <= N; i++) {
    result.push(x1 + i * step);
  }

  return result;
}

export function genSpacedNumbers(N: number, x1: number, step: number): number[] {
  const result = [];

  for (let i = 1; i <= N; i++) {
    result.push(x1 + i * step);
  }

  return result;
}

export interface SerializableObject {
  [key: string]: any;
}

export function createSerializableObject(obj: any): SerializableObject {
  const serializableObj: SerializableObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value !== 'function' && typeof value !== 'symbol') {
        if (value !== null && typeof value === 'object') {
          serializableObj[key] = createSerializableObject(value); // Recursively serialize nested objects
        } else {
          serializableObj[key] = value;
        }
      }
    }
  }

  return serializableObj;
}

const falseValues = ["", "0", "false", "no", "null", "undefined", "NaN"];

export function stringToBoolean(str: string|null): boolean {
  if (str === null || str === undefined) {
    return false;
  }

  return !falseValues.includes(str.toLowerCase().trim());
}


export function stringToDateTime(str: string|null): DateTime | null {
  if (str === null || str === undefined) {
    return null;
  }

  const result = stringToNumber(str); 
  if (result === null) {
    return null;
  } 

  // verify the number represents a valid date
  try {
    const date = new Date(result);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date number: ${str}`);
    }
  } catch (error) { 
    throw new Error(`Invalid date number: ${str}`);
  }

  return result ;
}

export function stringToNumber(str: string|null): number | null {
  if (str === null || str === undefined) {
    return null;
  }

  const result = Number(str);
  if (isNaN(result)) {
    throw new Error(`Invalid number string: ${str}`);
  }

  return result;
}

export function propsToQuery(props: unknown): string {
  const jsonString = JSON.stringify(props);
  const encodedJson = encodeURIComponent(jsonString);
  return `props=${encodedJson}`;
}

export function queryToProps<T>(query: string): T | null {
  const qs = queryString.parse(query);
  const props = qs["props"] as string | null | undefined;
  if (!props) {
    return null;
  }

  const decodedJson = decodeURIComponent(props as string);
  if (!decodedJson) { 
    return null;
  }

  const data = JSON.parse(decodedJson) as T;
  return data;
}

export function createRoutePath<T>(path: string, props: T): string {
  return `${path}?${propsToQuery(props)}`;
}

export function parseRoutePath<T>(path: string): T | null {
  const query = path.split("?")[1];
  if (!query) {
    return null;
  }

  const data = queryToProps<T>(query);
  return data;
}

// to be used with the useLocalSearchParams() output
export function parseSearchParams<T>(searchParams: Record<string, string>): T | null {
  const props = searchParams["props"];
  if (!props) {
    return null;
  }
  const decodedJson = decodeURIComponent(props);
  if (!decodedJson) { 
    return null;
  }

  const data = JSON.parse(decodedJson) as T;
  return data;
}