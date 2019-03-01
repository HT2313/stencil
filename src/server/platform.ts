import * as d from '@declarations';


export const getDocument = (elm?: Node) => elm.ownerDocument;

export const getWindow = (elm?: Node) => getDocument(elm).defaultView;

export const getHead = (elm?: Node) => getDocument(elm).head;

export const writeTask = (cb: Function) => cb();

export const tick = {
  then(cb: Function) {
    cb();
  }
};

export const consoleError = (e: any) => console.error(e);

export const loadModule = (_a: any, _b: any) => Promise.resolve() as any;

const Context = {
  isServer: true,
  enableListener: () => console.log('TODO'),
  queue: {
    write: writeTask,
    read: writeTask,
    tick
  }
};

export const getContext = (ref: d.RuntimeRef, context: string) => {
  if (context === 'window') {
    return getWindow(getHostRef(ref).$hostElement$);
  }
  if (context === 'document') {
    return getDocument(getHostRef(ref).$hostElement$);
  }
  if (context === 'isServer') {
    return true;
  }
  return (Context as any)[context];
};

export const plt: d.PlatformRuntime = {};

export const supportsShadowDom = false;

export const supportsListenerOptions = false;

const hostRefs: WeakMap<d.RuntimeRef, d.HostRef> = new WeakMap();

export const getHostRef = (ref: d.RuntimeRef) =>
  hostRefs.get(ref);

export const registerInstance = (lazyInstance: any, hostRef: d.HostRef) =>
  hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);

export const registerHost = (elm: d.HostElement) => {
  const hostRef: d.HostRef = {
    $stateFlags$: 0,
    $hostElement$: elm,
    $instanceValues$: new Map()
  };
  return hostRefs.set(elm, hostRef);
};


export const styles: d.StyleMap = new Map();

export const rootAppliedStyles: d.RootAppliedStyleMap = new WeakMap();


export {
  connectedCallback,
  createEvent,
  getConnect,
  getElement,
  setMode,
  getMode,
  Build,
  Host,
  h
} from '@runtime';