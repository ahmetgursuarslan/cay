// Non-streaming server entry to avoid "destination stream closed early" during dev
import type { AppLoadContext, EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  try {
    const markup = renderToString(
      <ServerRouter context={routerContext} url={request.url} />
    );
    const html = '<!DOCTYPE html>' + markup;
    responseHeaders.set('Content-Type', 'text/html');
    return new Response(html, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error(err);
    responseStatusCode = 500;
    responseHeaders.set('Content-Type', 'text/html');
    return new Response('<!DOCTYPE html><html><body>Server Error</body></html>', {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  }
}

