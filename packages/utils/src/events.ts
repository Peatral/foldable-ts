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
