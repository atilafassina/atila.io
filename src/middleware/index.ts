import { createMiddleware } from "@solidjs/start/middleware";
import { handleRedirects } from "./redirects";
import { securityHeaders } from "shieldwall/start";
import { type FetchEvent } from "@solidjs/start/server";

const securityHeadersMiddleware = (event: FetchEvent) => {
  // Skip security headers during prerendering
  // During prerendering, event.nativeEvent.node.res is undefined
  if (!event.nativeEvent?.node?.res) {
    return;
  }
  return securityHeaders()(event);
};

export default createMiddleware({
  onRequest: [handleRedirects, securityHeadersMiddleware],
});
