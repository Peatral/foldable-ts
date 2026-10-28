export function subscribeToPosture(callback: () => void): () => void {
  if (navigator.devicePosture) {
    navigator.devicePosture.addEventListener('change', callback);
  }

  return () => {
    if (navigator.devicePosture) {
      navigator.devicePosture.removeEventListener('change', callback);
    }
  };
}

export function subscribeToResize(callback: () => void): () => void {
  window.addEventListener('resize', callback);

  return () => {
    window.removeEventListener('resize', callback);
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
