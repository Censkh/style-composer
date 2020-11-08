import {isWeb}    from "./Utils";

export type Optimisable<T extends string | number> = T & { optimise(value: T): string | number };

export const createOptimisable = <T extends string | number>(value: T, optimise: (value: T) => string | number): Optimisable<T> => {
  return Object.assign(value, {optimise});
};

export const createWebOptimisable = <T extends string | number>(value: T, optimise: (value: T) => string | number): Optimisable<T> => {
  return createOptimisable(value, (value) => {
    if (isWeb()) {
      return optimise(value);
    }
    return value;
  });
};

export const isOptimisable = <T extends string | number>(value: T): value is Optimisable<T> => {
  return value !== undefined && value !== null && typeof (value as any).optimise !== "undefined";
};
