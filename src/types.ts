export interface PageDef<T> {
  name: string;
  component: string;
  args: T;
}

export interface FormDef {
  title: string;
}

export interface GridDef {
  title: string;
}

interface NavigateBack {
  context: "back";
}

interface NavigateForward {
  context: "main" | "drawer";
  name: string;
}

export type NavigateOptions = NavigateBack | NavigateForward;

export interface NavigateFn {
  (options: NavigateOptions): void;
}

export interface DrawerDef {
  id?: number;
  name: string;
  component: any;
  args?: any;
  onClose?: any;
  callbacks?: any;
  props?: any;
}
