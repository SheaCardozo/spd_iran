function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const response = await env.ASSETS.fetch(assetRequest(request, pathname));

    if (response.status !== 404 || pathname.includes('.')) {
      return response;
    }

    return env.ASSETS.fetch(assetRequest(request, '/index.html'));
  },
};
