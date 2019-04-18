import * as Router from "koa-router";
import * as Koa from "koa";

import marvel from "./marvel";
import { getHealth } from "./health";

declare module "koa" {
  interface BaseContext {
    routes: Router.Layer[];
  }
}

/**
 * Allows keeping track of routes in koa.context
 *
 * @param koa
 * @param routes
 */
function registerRoutes(koa: Koa, ...routes: Router[]) {
  koa.context.routes = [];
  routes.forEach(router => {
    koa.context.routes.push(...router.stack);
    koa.use(router.routes());
    koa.use(router.allowedMethods());
  });
}

export default function router(koa: Koa): Router {
  const router = new Router();
  router.get("/health", getHealth);
  registerRoutes(koa, router, marvel);

  return router;
}
