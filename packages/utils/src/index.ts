import {
  subscribeToPosture,
  subscribeToResize,
  subscribeToViewportSegments,
} from './events';
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
  subscribeToViewportSegments,
  segmentsEqual,
  getDevicePosture,
  getViewportSegments,
  FALLBACK_DEVICE_POSTURE,
  FALLBACK_VIEWPORT_SEGMENTS,
};
