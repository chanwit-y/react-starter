import { Subject } from "rxjs";
import { LoaderType } from "../../@types/LoaderType";
import { ErrorType } from "../../@types/ErrorType";

class SubjectObservable<T> {
  subject = new Subject<T>();

  set(payload: T) {
    this.subject.next(payload)
  }

  subscribe(subscriber: (payload: T) => void) {
    this.subject.subscribe((payload) => {
      subscriber(payload)
    })
  }

  unsubscribe() {
    this.subject.unsubscribe()
  }
}

export const loader$ = new SubjectObservable<LoaderType>()
export const error$ = new SubjectObservable<ErrorType>()