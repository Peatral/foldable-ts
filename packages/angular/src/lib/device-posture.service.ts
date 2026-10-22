import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, merge, debounceTime, map, distinctUntilChanged, startWith, shareReplay } from 'rxjs';
import { FALLBACK_DEVICE_POSTURE, getDevicePosture, subscribeToPosture } from '@foldable-ts/utils';

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
      map(() => getDevicePosture()),
      distinctUntilChanged((prev, curr) => prev === curr),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.posture = toSignal(this.posture$, { initialValue: FALLBACK_DEVICE_POSTURE });
  }
}