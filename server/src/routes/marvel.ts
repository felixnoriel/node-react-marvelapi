import * as Router from "koa-router";
import { getList, getObject } from "../controllers/marvel";
import validate from "../middleware/validate";
import { StringType, NumberType } from "../schema/types";

const router = new Router({ prefix: "/marvel" });

/**
 * Get all list by entity type. eg: /marvel/characters
 * First middleware will validate that entity_type is string and required
 * Second middleware will validate entity_type as a valid marvel API endpoint
 * Third middleware is the controller to get the list
 */
router.get(
  "/:entity_type",
  validate({
    "params.entity_type": StringType.required()
  }),
  async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const marvelEntityList = [
      "characters",
      "comics",
      "creators",
      "events",
      "series",
      "stories"
    ];
    if (marvelEntityList.indexOf(ctx.params.entity_type.toLowerCase()) >= 0) {
      return await next();
    }
    ctx.status = 404;
    ctx.body = {
      status: "error",
      errors: "Marvel entity type invalid"
    };
  },
  getList
);

/**
 * Get all list by entity type. eg: /marvel/characters
 * First middleware will validate that entity_type is string and required
 * Third middleware is the controller to get the list
 */
router.get(
  "/:entity_type/:entity_id",
  validate({
    "params.entity_type": StringType.required(),
    "params.entity_id": NumberType.required()
  }),
  getObject
);

export default router;
