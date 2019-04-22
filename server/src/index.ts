import * as Koa from "koa";
import * as http from "http";
import * as KoaBody from "koa-body";
import * as Cors from "@koa/cors";
import * as Os from "os";
import * as Cluster from "cluster";

import router from "./routes";
import config from "./config";

export const app = new Koa();
let server;

/**
 * This will use all the available CPU cores as workers, also will restore workers when they die
 */
if (Cluster.isMaster && config.NODE_ENV !== "test") {
  console.log(`Master process with pid ${process.pid} starting... `);
  for (let i = 0; i < Os.cpus().length; i++) {
    Cluster.fork();
  }
  Cluster.on("online", worker => {
    // console.log(`worker with id:${worker.id} & pid:${worker.process.pid} is online`)
  });
  Cluster.on("exit", (worker, code, signal) => Cluster.fork());
  Cluster.on("disconnect", (worker, code, signal) => Cluster.fork());
} else {
  /**
   * @todo error middlware
   * @todo time middlware
   * @todo request XID middleware
   */

  // parse request body to format into json/form
  app.use(KoaBody());

  // CORS
  app.use(Cors());

  // add routers to app
  router(app);

  server = http.createServer(app.callback());

  server.listen(config.port, () => {
    console.log(`Application is listening on http://localhost:${config.port}/`);
  });
}

// Export for testing.
export default server;
