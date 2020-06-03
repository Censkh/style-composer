export type StyleRuleInstances = Record<number, StyleRuleInstance<any>>;

const ruleSession = {
  id         : 1,
  registering: false,
  running    : false,
  instances  : {} as StyleRuleInstances,
};

export const startRuleSession = (registering?: boolean): void => {
  ruleSession.id          = 1;
  ruleSession.registering = Boolean(registering);
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

export interface StyleRuleOptions<O = undefined> {
  check: (options: O) => boolean;

  register?: (update: () => void) => void;

  unregister?: () => void;
}

export interface StyleRule<O = undefined> extends StyleRuleOptions<O> {
  (options: O): number;

  id: number;
  name: string;
}

export interface StyleRuleInstance<O = undefined> {
  id: number;
  className: string;
  sheetId: number | null;
  options: O;
  rule: StyleRule<O>;
}

type Callback = () => void;

const ruleCallbacks = {} as Record<string, Set<Callback>>;

export const registerRuleCallback   = (rule: StyleRule, callback: Callback): void => {
  let callbacks = ruleCallbacks[rule.name];
  if (!callbacks) {
    callbacks = ruleCallbacks[rule.name] = new Set();
  }
  callbacks.add(callback);
};

export const unregisterRuleCallback = (rule: StyleRule, callback: Callback): void => {
  const callbacks = ruleCallbacks[rule.name];
  if (callbacks) {
    callbacks.delete(callback);
  }
};

const createUpdateCallback = (rule: StyleRule<any>) => {
  return () => {
    ruleCallbacks[rule.name]?.forEach(callback => callback());
  };
};

export function createStyleRule<O>(name: string, options: StyleRuleOptions<O>): StyleRule<O> {
  const rule: StyleRule<O> = Object.assign((options: O) => {
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

    return rule.check(options) ? id : 0;
  }, options || {}, {id: 0});
  Object.defineProperty(rule, "name", {value: name});

  if (rule.register) {
    rule.register(createUpdateCallback(rule));
  }
  return rule;
}