import { AxiosError } from "axios";
import { Subject } from "rxjs";

export const error$ = new Subject<AxiosError>();