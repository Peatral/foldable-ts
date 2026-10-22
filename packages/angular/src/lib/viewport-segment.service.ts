import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, merge, debounceTime, map, distinctUntilChanged, startWith, shareReplay } from 'rxjs';
import { subscribeToPosture, subscribeToResize, segmentsEqual, FALLBACK_VIEWPORT_SEGMENTS, getViewportSegments } from '@foldable-ts/utils';

@Injectable({
  providedIn: 'root'
})
export class ViewportSegmentsService {
  public readonly segments$: Observable<DOMRect[]>;
  public readonly segments: Signal<DOMRect[]>;

  constructor() {
    const resize$ = new Observable<void>(observer => {
      return subscribeToResize(() => observer.next());
    });

    const posture$ = new Observable<void>(observer => {
      return subscribeToPosture(() => observer.next());
    });

    this.segments$ = merge(resize$, posture$).pipe(
      startWith(undefined),
      debounceTime(50),
      map(() => getViewportSegments()),
      distinctUntilChanged(segmentsEqual),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.segments = toSignal(this.segments$, { initialValue: FALLBACK_VIEWPORT_SEGMENTS });
  }
}