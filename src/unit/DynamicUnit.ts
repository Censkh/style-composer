export const DYNAMIC_UNIT_REGISTER_CHECK_VALUE = -Infinity;

const dynamicUnitSession: DynamicUnitSession = {
  running: false,
  called : false,
};

export interface DynamicUnitSession {
  running: boolean;
  called: boolean;
}

export const startDynamicUnitSession = (): void => {
  dynamicUnitSession.called  = false;
  dynamicUnitSession.running = true;
};

export const finishDynamicUnitSession = (): boolean => {
  dynamicUnitSession.running = false;
  return dynamicUnitSession.called;
};

export interface DynamicUnit<O, R extends number | string> {
  (value?: O): R;

  key: string;
}

export const createDynamicUnit = <O, R extends number | string>(key: string, func: (value?: O) => R): DynamicUnit<O, R> => {
  return Object.assign((value?: O) => {
    if (dynamicUnitSession.running) {
      dynamicUnitSession.called = true;
      return DYNAMIC_UNIT_REGISTER_CHECK_VALUE as any;
    }
    return func(value);
  }, {key});
};
