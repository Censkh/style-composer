export const DYNAMIC_UNIT_REGISTER_CHECK_VALUE = -Infinity;

let dynamicUnitSession: DynamicUnitSession = {
  running: false,
  called : false,

};

export interface DynamicUnitSession {
  running: boolean;
  called: boolean;
}

export const startDynamicUnitSession = () => {
  dynamicUnitSession.called = false;
  dynamicUnitSession.running = true;
};

export const finishDynamicUnitSession = (): boolean => {
  dynamicUnitSession.running = false;
  return dynamicUnitSession.called;
};

export interface DynamicUnit {
  (): number;

  key: string;
}

export const createDynamicUnit = (key: string, func: () => number): DynamicUnit => {
  return Object.assign(() => {
    if (dynamicUnitSession.running) {
      dynamicUnitSession.called = true;
      return DYNAMIC_UNIT_REGISTER_CHECK_VALUE;
    }
    return func();
  }, {key});
};