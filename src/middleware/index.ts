import { createMiddleware } from "@solidjs/start/middleware";
import { handleRedirects } from "./redirects";
import { securityHeaders } from "shieldwall/start";

export default createMiddleware({
  onRequest: [handleRedirects, securityHeaders()],
});
