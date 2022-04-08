import { Subject } from "rxjs";
import { LoaderType } from "../../@types/LoaderType";

export const load$ = new Subject<LoaderType>();