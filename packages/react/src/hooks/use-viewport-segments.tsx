import { useSyncExternalStore } from 'react';
import { subscribeToPosture, subscribeToResize, getViewportSegments, FALLBACK_VIEWPORT_SEGMENTS } from '@foldable-ts/utils';

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
  return getViewportSegments();
}

function getServerSnapshot(): DOMRect[] {
  return FALLBACK_VIEWPORT_SEGMENTS;
}

export function useViewportSegments() {
  return useSyncExternalStore(
    subscribeToSegments,
    getSnapshot,
    getServerSnapshot,
  )
}