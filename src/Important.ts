export type ImportantValue<T extends string | number> = T & { __important: true };

const importantSession: ImportantSession = {
  running: false,
  called : false,
};

export interface ImportantSession {
  running: boolean;
  called: boolean;
}

export const startImportantSession = (): void => {
  importantSession.called  = false;
  importantSession.running = true;
};

export const finishImportantSession = (): boolean => {
  importantSession.running = false;
  return importantSession.called;
};

const important = <T extends string | number>(value: T): ImportantValue<T> => {
  if (importantSession.running) {
    importantSession.called = true;
  }
  return Object.assign(value, {__important: true}) as any;
};

export const isImportantValue = (value: any): value is string | number => {
  return value !== null && value !== undefined ? (value as any).__important : false;
};

export default important;
