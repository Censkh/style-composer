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

export interface DynamicUnit {
  (value?: number): number | string;

  key: string;
}

export const createDynamicUnit = (key: string, func: (value?: number) => number | string): DynamicUnit => {
  return Object.assign((value?: number) => {
    if (dynamicUnitSession.running) {
      dynamicUnitSession.called = true;
      return DYNAMIC_UNIT_REGISTER_CHECK_VALUE;
    }
    return func(value);
  }, {key});
};
