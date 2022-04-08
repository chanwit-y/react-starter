import { AxiosError } from "axios";
import { Subject } from "rxjs";

export type ErrorType = {
  statusCode: number;
}

export const error$ = new Subject<ErrorType>();