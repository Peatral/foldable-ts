import { useSyncExternalStore } from 'react';
import { subscribeToPosture } from '@foldable-ts/utils';

const FALLBACK: DevicePostureType = 'continuous';

function getSnapshot(): DevicePostureType {
  return navigator.devicePosture?.type || FALLBACK;
}

function getServerSnapshot(): DevicePostureType {
  return FALLBACK;
}

export function useDevicePosture() {
  return useSyncExternalStore(
    subscribeToPosture,
    getSnapshot,
    getServerSnapshot,
  )
}
