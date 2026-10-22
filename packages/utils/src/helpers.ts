import type { DevicePostureType } from '@foldable-ts/types';

export const FALLBACK_DEVICE_POSTURE: DevicePostureType = 'continuous';
export const FALLBACK_VIEWPORT_SEGMENTS: DOMRect[] = [];

let cachedSegments: DOMRect[] = FALLBACK_VIEWPORT_SEGMENTS;

export function getViewportSegments(): DOMRect[] {
  const current = window.viewport?.segments || [new DOMRect(0, 0, window.innerWidth, window.innerHeight)];

  if (segmentsEqual(cachedSegments, current)) {
    return cachedSegments;
  }

  cachedSegments = current;
  return cachedSegments;
}

export function getDevicePosture(): DevicePostureType {
  if (navigator.devicePosture?.type) {
    return navigator.devicePosture.type;
  }

  return FALLBACK_DEVICE_POSTURE;
}

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
