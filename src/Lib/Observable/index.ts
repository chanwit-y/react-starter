import { LoaderType, ErrorType } from '@types';
import { Subject } from "rxjs"

export const loader$ = new Subject<LoaderType>()
export const error$ = new Subject<ErrorType>()