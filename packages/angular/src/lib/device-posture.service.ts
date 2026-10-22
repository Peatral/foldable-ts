import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, merge, debounceTime, map, distinctUntilChanged, startWith, shareReplay } from 'rxjs';
import { subscribeToPosture } from '@foldable-ts/utils';

const FALLBACK: DevicePostureType = 'continuous';

@Injectable({
  providedIn: 'root'
})
export class DevicePostureService {
  public readonly posture$: Observable<DevicePostureType>;
  public readonly posture: Signal<DevicePostureType>;

  constructor() {
    const posture$ = new Observable<void>(observer => {
      return subscribeToPosture(() => observer.next());
    });

    this.posture$ = merge(posture$).pipe(
      startWith(undefined),
      debounceTime(50),
      map(() => {
        const current = navigator.devicePosture?.type;
        return (!current || current.length === 0) ? FALLBACK : current;
      }),
      distinctUntilChanged((prev, curr) => prev === curr),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.posture = toSignal(this.posture$, { initialValue: FALLBACK });
  }
}