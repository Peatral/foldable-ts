export type DevicePostureType = 'continuous' | 'folded';

export interface DevicePostureEventMap {
  'change': Event;
}

export interface DevicePosture extends EventTarget {
  readonly type: DevicePostureType;

  addEventListener<K extends keyof DevicePostureEventMap>(type: K, listener: (this: DevicePosture, ev: DevicePostureEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof DevicePostureEventMap>(type: K, listener: (this: DevicePosture, ev: DevicePostureEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface Viewport {
  readonly segments: DOMRect[];
}

declare global {
  interface Navigator {
    // Optional since its experimental and not supported everywhere, i.e. Firefox
    devicePosture?: DevicePosture;
  }

  interface Window {
    // Optional since its experimental and not supported everywhere, i.e. Firefox
    viewport?: Viewport;
  }
}
