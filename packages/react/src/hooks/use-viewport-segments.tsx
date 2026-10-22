import { useSyncExternalStore } from 'react';
import { subscribeToPosture, subscribeToResize, segmentsEqual } from '@foldable-ts/utils';

const FALLBACK: DOMRect[] = [];
let cachedSegments: DOMRect[] = FALLBACK;

const listeners = new Set<() => void>();

let unsubscribeResize: (() => void) | null = null;
let unsubscribePosture: (() => void) | null = null;
let timeoutId: ReturnType<typeof setTimeout>;

const handleGlobalChange = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    listeners.forEach((listener) => listener());
  }, 50);
};

function subscribeToSegments(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  if (listeners.size === 1) {
    unsubscribeResize = subscribeToResize(handleGlobalChange);
    unsubscribePosture = subscribeToPosture(handleGlobalChange);
  }

  return () => {
    listeners.delete(onStoreChange);

    if (listeners.size === 0) {
      unsubscribeResize?.();
      unsubscribePosture?.();
      clearTimeout(timeoutId);
    }
  };
}

function getSnapshot(): DOMRect[] {
  const currentSegments = window.viewport?.segments;

  if (!currentSegments || currentSegments.length === 0) {
    return FALLBACK;
  }

  const isSame = 
    cachedSegments !== FALLBACK &&
    segmentsEqual(cachedSegments, currentSegments);

  if (isSame) {
    return cachedSegments;
  }

  cachedSegments = currentSegments;
  return cachedSegments;
}

function getServerSnapshot(): DOMRect[] {
  return FALLBACK;
}

export function useViewportSegments() {
  return useSyncExternalStore(
    subscribeToSegments,
    getSnapshot,
    getServerSnapshot,
  )
}