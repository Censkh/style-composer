const ruleSession = {
  id:          1,
  registering: false,
  instances:   {} as Record<number, StyleRuleInstance<any>>
};

export const startRuleSession = (registering?: boolean): void => {
  ruleSession.id = 1;
  ruleSession.registering = Boolean(registering);
  ruleSession.instances = {};
};

export const finishRuleSession = (): Record<number, StyleRuleInstance<any>> => {
  return ruleSession.instances;
};

export interface StyleRuleOptions<O = undefined> {
  check: (options: O) => boolean;

  register?: (update: () => void) => void;

  unregister?: () => void;
}

export interface StyleRule<O = undefined> extends StyleRuleOptions<O> {
  (options: O): number;

  name: string;
}

export interface StyleRuleInstance<O = undefined> {
  id: number;
  className: string;
  options: O,
  rule: StyleRule<O>
}

type Callback = () => void;

const ruleCallbacks = {} as Record<string, Set<Callback>>;

export const registerRuleCallback = (rule: StyleRule, callback: Callback) => {
  let callbacks = ruleCallbacks[rule.name];
  if (!callbacks) {
    callbacks = ruleCallbacks[rule.name] = new Set();
  }
  callbacks.add(callback);
};
export const unregisterRuleCallback = (rule: StyleRule, callback: Callback) => {
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
    const id = ruleSession.id;
    ruleSession.id += 1;
    if (ruleSession.registering) {
      ruleSession.instances[id] = {
        id:        id,
        options:   options,
        rule:      rule,
        className: "_rule_" + id + rule.name
      };
      return id;
    }
    return rule.check(options) ? id: 0;
  }, options || {});
  Object.defineProperty(rule, "name", {value: name});

  if (rule.register) {
    rule.register(createUpdateCallback(rule));
  }
  return rule;
}