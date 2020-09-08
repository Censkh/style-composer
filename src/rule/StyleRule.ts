import {StylingSession} from "../Styling";

export type StyleRules = Record<number, StyleRule<any>>;

const ruleSession = {
  id         : 1,
  registering: false,
  running    : false,
  instances  : {} as StyleRules,
  session    : undefined as (StylingSession | undefined),
};

export const startRuleSession = (registering?: boolean, session?: StylingSession): void => {
  ruleSession.id          = 1;
  ruleSession.registering = Boolean(registering);
  ruleSession.session     = session;
  ruleSession.running     = true;
  ruleSession.instances   = {};
};

export const finishRuleSession = (): StyleRules => {
  ruleSession.registering = false;
  ruleSession.running     = false;
  return ruleSession.instances;
};

export type StyleRuleResult = number & { __ruleId: number };

const createRuleResult = (ruleId: number, result: boolean): StyleRuleResult => {
  return Object.assign(result ? ruleId : 0, {__ruleId: ruleId});
};

export const isResultSuccess = (result: StyleRuleResult): boolean => result != 0;

export const not = (rule: StyleRuleResult): StyleRuleResult => {
  return createRuleResult(rule.__ruleId, !isResultSuccess(rule));
};

export const and = (...rules: StyleRuleResult[]): StyleRuleResult => {
  const ruleId = Math.max(...rules.map(result => result.__ruleId));

  if (ruleSession.registering) return createRuleResult(ruleId, true);

  return createRuleResult(ruleId, rules.every(isResultSuccess));
};

export const or = (...rules: StyleRuleResult[]): StyleRuleResult => {
  const ruleId = Math.max(...rules.map(result => result.__ruleId));

  if (ruleSession.registering) return createRuleResult(ruleId, true);
  return createRuleResult(ruleId, rules.some(isResultSuccess));
};

export interface StyleRuleOptions<O = void> {
  check: (options: O, session?: StylingSession) => boolean;

  register?: (update: () => void) => void;

  unregister?: () => void;
}

export type StyleRuleFunction<O = void> = void extends O ?
  ((options?: O) => StyleRuleResult) :
  ((options: O) => StyleRuleResult);

export type StyleRuleType<O = void> = StyleRuleOptions<O> & StyleRuleFunction<O> & {
  id: string;
}

export interface StyleRule<O = void> {
  id: number;
  key: number;
  className: string;
  sheetId: number | null;
  options: O;
  type: StyleRuleType<O>;
}

type Callback = () => void;

const ruleCallbacks = {} as Record<string, Set<Callback>>;

export const registerRuleCallback = (ruleType: StyleRuleType, callback: Callback): void => {
  let callbacks = ruleCallbacks[ruleType.id];
  if (!callbacks) {
    callbacks = ruleCallbacks[ruleType.id] = new Set();
  }
  callbacks.add(callback);
};

export const unregisterRuleCallback = (rule: StyleRuleType, callback: Callback): void => {
  const callbacks = ruleCallbacks[rule.id];
  if (callbacks) {
    callbacks.delete(callback);
  }
};

const createUpdateCallback = (rule: StyleRuleType<any>) => {
  return () => {
    ruleCallbacks[rule.id]?.forEach(callback => callback());
  };
};

let gid = 0;

export function createStyleRuleType<O, P = {}>(id: string, options: StyleRuleOptions<O>, extraProperties?: P): StyleRuleType<O> & P {
  const ruleType: StyleRuleType<any> = Object.assign(function(options: O) {
    if (!ruleSession.running) {
      throw new Error("[style-composer] Do not call rule functions outside of a class definition");
    }
    const id = ruleSession.id;
    ruleSession.id += 1;
    if (ruleSession.registering) {
      ruleSession.instances[id] = {
        id       : id,
        key: gid++,
        options  : options || {},
        type     : ruleType,
        className: "__rule_" + id + ruleType.id,
        sheetId  : null,
      };

      return createRuleResult(id, true);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return createRuleResult(id, ruleType.check(options, ruleSession.session!));
  }, options || {}, {...extraProperties, id: id});
  Object.defineProperty(ruleType, "name", {value: id});

  if (ruleType.register) {
    ruleType.register(createUpdateCallback(ruleType));
  }
  return (ruleType as any);
}

