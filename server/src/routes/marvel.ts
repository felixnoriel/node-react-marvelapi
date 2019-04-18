import * as Router from "koa-router";
import { getList, getObject } from "../controllers/marvel";
import validate from "../middleware/validate";
import { StringType, NumberType } from "../schema/types";

const router = new Router({ prefix: "/marvel" });

router.get(
  "/:entity_type",
  validate({
    "params.entity_type": StringType.required()
  }),
  getList
);

router.get(
  "/:entity_type/:entity_id",
  validate({
    "params.entity_type": StringType.required(),
    "params.entity_id": NumberType.required()
  }),
  getObject
);

export default router;
