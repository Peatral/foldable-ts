export function segmentsEqual(prev: DOMRect[], curr: DOMRect[]): boolean {
  if (prev === curr) return true;
  if (prev.length !== curr.length) return false;
  return prev.every((rect, i) =>
    rect.x === curr[i].x &&
    rect.y === curr[i].y &&
    rect.width === curr[i].width &&
    rect.height === curr[i].height
  );
}

export function isFolded(): boolean {
  if (navigator.devicePosture?.type) {
    return navigator.devicePosture.type === 'folded';
  }
  return false;
}
