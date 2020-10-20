import {StyleScope, StylingResolution, StylingSession} from "../Styling";

export type StyleSelectors = Record<number, StyleSelector<any>>;

const selectorSession = {
  id         : 1,
  registering: false,
  running    : false,
  instances  : {} as StyleSelectors,
  resolution : undefined as (StylingResolution | undefined),
  session    : undefined as (StylingSession | undefined),
};

export const startSelectorSession = (registering?: boolean, resolution?: StylingResolution, session?: StylingSession): void => {
  selectorSession.id          = 1;
  selectorSession.registering = Boolean(registering);
  selectorSession.session     = session;
  selectorSession.running     = true;
  selectorSession.resolution  = resolution;
  selectorSession.instances   = {};
};

export const finishSelectorSession = (): StyleSelectors => {
  selectorSession.registering = false;
  selectorSession.running     = false;
  return selectorSession.instances;
};

export type StyleSelectorResult = number & { __selectorResult: { resultId: number; ids: number[] } };

const createSelectorResult = (selectorIds: number[], result: boolean): StyleSelectorResult => {
  const resultId = Math.max(...selectorIds);
  return Object.assign(result ? resultId : 0, {__selectorResult: {resultId, ids: selectorIds}});
};

export const isSelectorResult = (result: any): result is StyleSelectorResult => {
  return typeof result === "object" && "__selectorResult" in result;
};

export const isResultSuccess = (result: StyleSelectorResult): boolean => result != 0;

export const not = (selector: StyleSelectorResult): StyleSelectorResult => {
  return createSelectorResult(selector.__selectorResult.ids, !isResultSuccess(selector));
};

export const and = (...selectors: StyleSelectorResult[]): StyleSelectorResult => {
  const ids = selectors.flatMap(selector => selector.__selectorResult.ids);

  if (selectorSession.registering) {
    const result                                                                  = createSelectorResult(ids, true);
    selectorSession.instances[result.__selectorResult.resultId].compoundSelectors = result.__selectorResult.ids;
    return result;
  }

  return createSelectorResult(ids, selectors.every(isResultSuccess));
};

export const or = (...selectors: StyleSelectorResult[]): StyleSelectorResult => {
  const ids = selectors.flatMap(selector => selector.__selectorResult.ids);

  if (selectorSession.registering) {
    const result                                                                  = createSelectorResult(ids, true);
    selectorSession.instances[result.__selectorResult.resultId].compoundSelectors = result.__selectorResult.ids;
    return result;
  }
  return createSelectorResult(ids, selectors.some(isResultSuccess));
};

export interface StyleSelectorOptions<O = void> {
  check: (selector: StyleSelector<O>, session: StylingSession) => boolean;

  register?: (update: () => void) => void;

  unregister?: () => void;
}

export type StyleSelectorFunction<O = void> = void extends O ?
  ((options?: O) => StyleSelectorResult) :
  ((options: O) => StyleSelectorResult);

export type StyleSelectorType<O = void> = StyleSelectorOptions<O> & StyleSelectorFunction<O> & {
  id: string;
}

export interface StyleSelector<O = void> {
  scope: StyleScope | null;
  compoundSelectors: number[];
  id: number;
  key: number;
  className: string;
  sheetId: number | null;
  options: O;
  type: StyleSelectorType<O>;
}

type Callback = () => void;

const selectorCallbacks = {} as Record<string, Set<Callback>>;

export const registerSelectorCallback = (selectorType: StyleSelectorType, callback: Callback): void => {
  let callbacks = selectorCallbacks[selectorType.id];
  if (!callbacks) {
    callbacks = selectorCallbacks[selectorType.id] = new Set();
  }
  callbacks.add(callback);
};

export const unregisterSelectorCallback = (selector: StyleSelectorType, callback: Callback): void => {
  const callbacks = selectorCallbacks[selector.id];
  if (callbacks) {
    callbacks.delete(callback);
  }
};

const createUpdateCallback = (selector: StyleSelectorType<any>) => {
  return () => {
    selectorCallbacks[selector.id]?.forEach(callback => callback());
  };
};

let gid = 0;

export function createStyleSelectorType<O, P = {}>(id: string, options: StyleSelectorOptions<O>, extraProperties?: P): StyleSelectorType<O> & P {
  const selectorType: StyleSelectorType<any> = Object.assign(function(options: O) {
    if (!selectorSession.running) {
      throw new Error("[style-composer] Do not call selector functions outside of a class definition");
    }
    const id = selectorSession.id;
    selectorSession.id += 1;
    if (selectorSession.registering) {
      selectorSession.instances[id] = {
        compoundSelectors: [],
        scope            : null,
        id               : id,
        key              : gid++,
        options          : options || {},
        type             : selectorType,
        className        : "__selector_" + id + selectorType.id,
        sheetId          : null,
      };

      return createSelectorResult([id], true);
    }

    // eslint-disable-next-line
    const instance = selectorSession.resolution!.rootScope.selectors[id];
    // eslint-disable-next-line
    return createSelectorResult([id], selectorType.check(instance, selectorSession.session!));
  }, options || {}, {...extraProperties, id: id});
  Object.defineProperty(selectorType, "name", {value: id});

  if (selectorType.register) {
    selectorType.register(createUpdateCallback(selectorType));
  }
  return (selectorType as any);
}

