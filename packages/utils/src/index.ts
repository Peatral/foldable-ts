import type {} from '@foldable-ts/types';

import { subscribeToPosture, subscribeToResize } from './events';
import {
  segmentsEqual,
  getDevicePosture,
  getViewportSegments,
  FALLBACK_DEVICE_POSTURE,
  FALLBACK_VIEWPORT_SEGMENTS,
} from './helpers';

export {
  subscribeToPosture,
  subscribeToResize,
  segmentsEqual,
  getDevicePosture,
  getViewportSegments,
  FALLBACK_DEVICE_POSTURE,
  FALLBACK_VIEWPORT_SEGMENTS,
};
