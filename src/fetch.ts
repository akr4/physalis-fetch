type MyRequestInit = RequestInit & { timeout?: number };
type MyRequestInitFunc = (init: MyRequestInit) => MyRequestInit;
type MyFetchType = (input: RequestInfo, init?: MyRequestInit) => Promise<Response>;

type MergeRequestInit = (
  defaultInit: MyRequestInit | MyRequestInitFunc,
  init: MyRequestInit | undefined,
) => MyRequestInit;

export const makeFetch = (defaultInit: MyRequestInit, mergeRequestInit: MergeRequestInit = simpleMerge) => {
  return (input: RequestInfo, init?: MyRequestInit): Promise<Response> => {
    return myFetch(input, mergeRequestInit(defaultInit, init));
  };
};

const simpleMerge: MergeRequestInit = (defaultInit, init) => {
  return {
    ...defaultInit,
    ...init,
  };
};

export const mergeHeaders: MergeRequestInit = (defaultInit, init) => {
  if (typeof defaultInit === 'function') {
    return defaultInit(init || {});
  } else {
    return {
      ...defaultInit,
      ...init,
      headers: {
        ...defaultInit.headers,
        ...init?.headers,
      },
    };
  }
};

const myFetch: MyFetchType = (input: RequestInfo, init?: MyRequestInit): Promise<Response> => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const responsePromise = fetch(input, { ...init, signal });

  let timer: any;
  if (init?.timeout != null) {
    timer = setTimeout(() => abortController.abort(), init?.timeout);
  }

  const clear = (x: any) => {
    if (timer != null) {
      clearTimeout(timer);
    }
    return x;
  };

  // TODO: Use finally if it is widely supported
  return responsePromise.then(clear).catch(clear);
};
