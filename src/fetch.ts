type MyRequestInit = RequestInit & { timeout?: number };
type MyFetchType = (input: RequestInfo, init?: MyRequestInit) => Promise<Response>;

type MergeRequestInit = (defaultInit: MyRequestInit, init: MyRequestInit | undefined) => MyRequestInit;

export const makeFetch = (defaultInit: MyRequestInit, mergeRequestInit: MergeRequestInit = simpleMerge) => {
  return (input: RequestInfo, init?: MyRequestInit): Promise<Response> => {
    return myFetch(input, mergeRequestInit(defaultInit, init));
  };
};

export const simpleMerge: MergeRequestInit = (defaultInit, init) => {
  return {
    ...defaultInit,
    ...init,
  };
};

export const mergeHeaders: MergeRequestInit = (defaultInit, init) => {
  return {
    ...defaultInit,
    ...init,
    headers: {
      ...defaultInit.headers,
      ...init?.headers,
    },
  };
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
