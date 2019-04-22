import { IRouterContext } from "koa-router";

/**
 * Function will check if API/server is running
 * @param ctx
 * @param next
 */
export function getHealth(ctx: IRouterContext, next: () => Promise<any>) {
  ctx.status = 200;
  ctx.body = {
    status: "ok"
  };
}
