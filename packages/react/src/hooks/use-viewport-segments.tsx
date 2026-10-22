import { useCallback, useSyncExternalStore } from 'react';
import { subscribeToViewportSegments, getViewportSegments, FALLBACK_VIEWPORT_SEGMENTS } from '@foldable-ts/utils';

function getSnapshot(): DOMRect[] {
  return getViewportSegments();
}

function getServerSnapshot(): DOMRect[] {
  return FALLBACK_VIEWPORT_SEGMENTS;
}

export function useViewportSegments(debounceMs = 50) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => subscribeToViewportSegments(onStoreChange, debounceMs),
    [debounceMs],
  );

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}
