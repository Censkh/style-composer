import {StylingSession} from "../Styling";

export type StyleRuleInstances = Record<number, StyleRuleInstance<any>>;

const ruleSession = {
  id         : 1,
  registering: false,
  running    : false,
  instances  : {} as StyleRuleInstances,
  session    : undefined as (StylingSession | undefined),
};

export const startRuleSession = (registering?: boolean, session?: StylingSession): void => {
  ruleSession.id          = 1;
  ruleSession.registering = Boolean(registering);
  ruleSession.session= session;
  ruleSession.running     = true;
  ruleSession.instances   = {};
};

export const finishRuleSession = (): StyleRuleInstances => {
  ruleSession.registering = false;
  ruleSession.running     = false;
  return ruleSession.instances;
};

export const and = (...rules: number[]): number => {
  if (ruleSession.registering) return Math.max(...rules);
  return rules.every(n => Boolean(n)) ? Math.max(...rules) : 0;
};

export const or = (...rules: number[]): number => {
  if (ruleSession.registering) return Math.max(...rules);
  return rules.some(n => Boolean(n)) ? Math.max(...rules) : 0;
};

export interface StyleRuleOptions<O = void> {
  check: (options: O, session: StylingSession) => boolean;

  register?: (update: () => void) => void;

  unregister?: () => void;
}

export type StyleRule<O = void> = void extends O ? (options?: O) => number : (options: O) => number;

export type StyleRuleType<O = void> = StyleRuleOptions<O> & StyleRule<O> & {
  id: number;
  name: string;
}

export interface StyleRuleInstance<O = void> {
  id: number;
  className: string;
  sheetId: number | null;
  options: O;
  rule: StyleRuleType<O>;
}

type Callback = () => void;

const ruleCallbacks = {} as Record<string, Set<Callback>>;

export const registerRuleCallback = (rule: StyleRuleType, callback: Callback): void => {
  let callbacks = ruleCallbacks[rule.name];
  if (!callbacks) {
    callbacks = ruleCallbacks[rule.name] = new Set();
  }
  callbacks.add(callback);
};

export const unregisterRuleCallback = (rule: StyleRuleType, callback: Callback): void => {
  const callbacks = ruleCallbacks[rule.name];
  if (callbacks) {
    callbacks.delete(callback);
  }
};

const createUpdateCallback = (rule: StyleRuleType<any>) => {
  return () => {
    ruleCallbacks[rule.name]?.forEach(callback => callback());
  };
};

export function createStyleRule<O>(name: string, options: StyleRuleOptions<O>): StyleRuleType<O> {
  const rule: StyleRuleType<any> = Object.assign((options: O) => {
    if (!ruleSession.running) {
      throw new Error("[style-composer] Do not call rule functions outside of a class definition");
    }
    const id = ruleSession.id;
    ruleSession.id += 1;
    if (ruleSession.registering) {
      ruleSession.instances[id] = {
        id       : id,
        options  : options || {},
        rule     : rule,
        className: "__rule_" + id + rule.name,
        sheetId  : null,
      };

      return id;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rule.check(options, ruleSession.session!) ? id : 0;
  }, options || {}, {id: 0});
  Object.defineProperty(rule, "name", {value: name});

  if (rule.register) {
    rule.register(createUpdateCallback(rule));
  }
  return rule as any;
}