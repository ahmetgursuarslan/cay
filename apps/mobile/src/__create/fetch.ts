import * as SecureStore from 'expo-secure-store';

const originalFetch = fetch;
const authKey = `${process.env.EXPO_PUBLIC_PROJECT_GROUP_ID}-jwt`;

const getURLFromArgs = (...args: Parameters<typeof fetch>) => {
  const [urlArg] = args;
  let url: string | null;
  if (typeof urlArg === 'string') {
    url = urlArg;
  } else if (typeof urlArg === 'object' && urlArg !== null) {
    // avoid relying on global DOM types; use structural checks
    const anyArg: any = urlArg as any;
    if (typeof anyArg.url === 'string') {
      url = anyArg.url;
    } else if (typeof anyArg.toString === 'function') {
      url = anyArg.toString();
    } else {
      url = null;
    }
  } else {
    url = null;
  }
  return url;
};

const isFirstPartyURL = (url: string) => {
  return (
    url.startsWith('/') ||
    (process.env.EXPO_PUBLIC_BASE_URL && url.startsWith(process.env.EXPO_PUBLIC_BASE_URL))
  );
};

const isSecondPartyURL = (url: string) => {
  return url.startsWith('/_create/');
};

type Params = Parameters<typeof fetch>;
const fetchToWeb = async function fetchWithHeaders(...args: Params) {
  const firstPartyURL = process.env.EXPO_PUBLIC_BASE_URL;
  const secondPartyURL = process.env.EXPO_PUBLIC_PROXY_BASE_URL;
  
  // MOCK MODE: No backend, return mock success for all API calls
  const [input, init] = args;
  const url = getURLFromArgs(input, init);
  
  if (url && (url.startsWith('/') || isFirstPartyURL(url) || isSecondPartyURL(url))) {
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ success: true, data: null }),
      text: async () => JSON.stringify({ success: true, data: null }),
      headers: new Headers({ 'content-type': 'application/json' }),
      redirected: false,
      type: 'basic',
      url: url,
      clone: function() { return this; },
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob([]),
      formData: async () => new FormData(),
      bodyUsed: false,
      body: null,
    } as Response);
  }
  
  // For external URLs, use original fetch
  if (!firstPartyURL || !secondPartyURL) {
    return originalFetch(...args);
  }
  
  return originalFetch(input, init);
};

export default fetchToWeb;
