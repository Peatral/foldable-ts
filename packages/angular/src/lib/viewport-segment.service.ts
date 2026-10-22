import { inject, Injectable, InjectionToken, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, distinctUntilChanged, startWith, shareReplay } from 'rxjs';
import { subscribeToViewportSegments, segmentsEqual, FALLBACK_VIEWPORT_SEGMENTS, getViewportSegments } from '@foldable-ts/utils';


export const VIEWPORT_SEGMENTS_DEBOUNCE = new InjectionToken<number | undefined>('VIEWPORT_SEGMENTS_DEBOUNCE', {
  providedIn: 'root',
  factory: () => undefined,
});


@Injectable({
  providedIn: 'root'
})
export class ViewportSegmentsService {
  public readonly segments$: Observable<DOMRect[]>;
  public readonly segments: Signal<DOMRect[]>;

  constructor() {
    const debounceMs = inject(VIEWPORT_SEGMENTS_DEBOUNCE);

    const segments$ = new Observable<void>(observer => {
      return subscribeToViewportSegments(() => observer.next(), debounceMs);
    });

    this.segments$ = segments$.pipe(
      startWith(undefined),
      map(() => getViewportSegments()),
      distinctUntilChanged(segmentsEqual),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.segments = toSignal(this.segments$, { initialValue: FALLBACK_VIEWPORT_SEGMENTS });
  }
}