export function subscribeToPosture(onStoreChange: () => void): () => void {
  if (navigator.devicePosture) {
    navigator.devicePosture.addEventListener('change', onStoreChange);
  }

  return () => {
    if (navigator.devicePosture) {
      navigator.devicePosture.removeEventListener('change', onStoreChange);
    }
  };
}

export function subscribeToResize(onStoreChange: () => void): () => void {
  window.addEventListener('resize', onStoreChange);

  return () => {
    window.removeEventListener('resize', onStoreChange);
  };
}

export function subscribeToViewportSegments(callback: () => void, debounceMs: number = 50): () => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  const handleGlobalChange = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, debounceMs);
  };

  const unsubResize = subscribeToResize(handleGlobalChange);
  const unsubPosture = subscribeToPosture(handleGlobalChange);

  return () => {
    clearTimeout(timeoutId);
    unsubResize();
    unsubPosture();
  };
}
