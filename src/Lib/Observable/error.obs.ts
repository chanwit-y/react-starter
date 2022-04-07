import { Subject } from "rxjs";

type Error = {
	code: number;
	message: string;
}

export const foo = new Subject<Error>();