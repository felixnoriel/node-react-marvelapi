import * as Koa from "koa";
import * as http from "http";
import * as KoaBody from "koa-body";
import * as Cors from "@koa/cors";

import router from "./routes";
import config from "./config";

export const app = new Koa();

// handles errors
// app.use(errors());

// parse request body to format into json/form
app.use(KoaBody());

// CORS
app.use(Cors());

// add routers to app
router(app);

const server = http.createServer(app.callback());

server.listen(config.port, () => {
  console.debug(`Application is listening on http://localhost:${config.port}/`);
});

// Export for testing.
export default server;
