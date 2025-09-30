import * as SecureStore from 'expo-secure-store';
const originalFetch = fetch;
const authKey = `${process.env.EXPO_PUBLIC_PROJECT_GROUP_ID}-jwt`;
const getURLFromArgs = (...args) => {
    const [urlArg] = args;
    let url;
    if (typeof urlArg === 'string') {
        url = urlArg;
    }
    else if (typeof urlArg === 'object' && urlArg !== null) {
        if (urlArg instanceof Request) {
            url = urlArg.url;
        }
        else if (urlArg instanceof URL) {
            url = urlArg.toString();
        }
        else {
            url = null;
        }
    }
    else {
        url = null;
    }
    return url;
};
const isFirstPartyURL = (url) => {
    return (url.startsWith('/') ||
        (process.env.EXPO_PUBLIC_BASE_URL && url.startsWith(process.env.EXPO_PUBLIC_BASE_URL)));
};
const isSecondPartyURL = (url) => {
    return url.startsWith('/_create/');
};
const fetchToWeb = async function fetchWithHeaders(...args) {
    const firstPartyURL = process.env.EXPO_PUBLIC_BASE_URL;
    const secondPartyURL = process.env.EXPO_PUBLIC_PROXY_BASE_URL;
    if (!firstPartyURL || !secondPartyURL) {
        return fetch(...args);
    }
    const [input, init] = args;
    const url = getURLFromArgs(input, init);
    if (!url) {
        return fetch(input, init);
    }
    const isExternalFetch = !isFirstPartyURL(url);
    // we should not add headers to requests that don't go to our own server
    if (isExternalFetch) {
        return fetch(input, init);
    }
    let finalInput = input;
    const baseURL = isSecondPartyURL(url) ? secondPartyURL : firstPartyURL;
    if (typeof input === 'string') {
        finalInput = input.startsWith('/') ? `${baseURL}${input}` : input;
    }
    else {
        return originalFetch(input, init);
    }
    const initHeaders = init?.headers ?? {};
    const finalHeaders = new Headers(initHeaders);
    const headers = {
        'x-createxyz-project-group-id': process.env.EXPO_PUBLIC_PROJECT_GROUP_ID,
        host: process.env.EXPO_PUBLIC_HOST,
        'x-forwarded-host': process.env.EXPO_PUBLIC_HOST,
        'x-createxyz-host': process.env.EXPO_PUBLIC_HOST,
    };
    for (const [key, value] of Object.entries(headers)) {
        if (value) {
            finalHeaders.set(key, value);
        }
    }
    const auth = await SecureStore.getItemAsync(authKey)
        .then((auth) => {
        return auth ? JSON.parse(auth) : null;
    })
        .catch(() => {
        return null;
    });
    if (auth) {
        finalHeaders.set('authorization', `Bearer ${auth.jwt}`);
    }
    return fetch(finalInput, {
        ...init,
        headers: finalHeaders,
    });
};
export default fetchToWeb;
