export interface IAction<E, T> {
  type: E;
  payload: T;
}
