import {interval, of} from 'rxjs';
import {delay, first} from 'rxjs/operators';

export const setTimeout$ = (cb: () => void, timer: number) => {
  of(true).pipe(delay(timer), first()).subscribe(cb);
};

export const setInterval$ = (cb: () => void, timer: number = 1000) => {
  return interval(timer).subscribe(cb);
};
