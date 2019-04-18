import * as Koa from "koa";
import * as _ from "lodash";
import Service from "../service";
import Cache from "../cache";

const cacheTTL = 60 * 60 * 1; // 1 hour
const cacheService = new Cache(cacheTTL);
const service = new Service();

export async function getList(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    const apiURL = `/v1/public/${ctx.params.entity_type}?${queryParams(ctx)}`;
    const data = await cacheService.get(apiURL, fetchData(apiURL));
    ctx.status = data.code || 500;
    ctx.body = {
      status: "success",
      data: data.data
    };
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = {
      status: err.statusCode || 500,
      error: err.body
    };
  }
}

export async function getObject(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    const apiURL = `/v1/public/${ctx.params.entity_type}/${
      ctx.params.entity_id
    }?`;
    const data = await cacheService.get(apiURL, fetchData(apiURL));
    ctx.status = data.code || 500;
    ctx.body = {
      status: "success",
      data: data.data
    };
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = {
      status: err.statusCode || 500,
      error: err.body
    };
  }
}

function queryParams(ctx: Koa.Context): string {
  let params: string = "";
  if (ctx.query.limit) {
    params += `limit=${ctx.query.limit}`;
  }
  if (ctx.query.offset) {
    params += `offset=${ctx.query.offset}`;
  }
  if (ctx.query.name) {
    params += `name=${ctx.query.name}`;
  }
  if (ctx.query.orderBy) {
    params += `orderBy=${ctx.query.orderBy}`;
  }
  return params;
}

async function fetchData(url: string): Promise<any> {
  return await service.sendRequest({
    path: url,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
