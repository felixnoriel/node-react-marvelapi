import { IRouterContext } from "koa-router";

export function getHealth(ctx: IRouterContext, next: () => Promise<any>) {
  ctx.status = 200;
  ctx.body = {
    status: "ok"
  };
}
