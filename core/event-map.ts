export interface EventMap {
  [event: string]: (...args: any[]) => any;
}
