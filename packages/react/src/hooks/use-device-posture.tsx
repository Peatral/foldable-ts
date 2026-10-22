import { useSyncExternalStore } from 'react';
import { FALLBACK_DEVICE_POSTURE, getDevicePosture, subscribeToPosture } from '@foldable-ts/utils';

function getSnapshot(): DevicePostureType {
  return getDevicePosture();
}

function getServerSnapshot(): DevicePostureType {
  return FALLBACK_DEVICE_POSTURE;
}

export function useDevicePosture() {
  return useSyncExternalStore(
    subscribeToPosture,
    getSnapshot,
    getServerSnapshot,
  )
}
