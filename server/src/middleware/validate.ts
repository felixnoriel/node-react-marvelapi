import * as Joi from "joi";
import * as Router from "koa-router";
import * as _ from "lodash";

/**
 * Validates input in accordance with Joi schema.
 *
 * @param rules
 * @param exitOnFirst
 */
function validate(
  rules: { [key: string]: Joi.AnySchema },
  exitOnFirstError: boolean = false
): Router.IMiddleware {
  return async function(ctx: Router.IRouterContext, next: () => Promise<any>) {
    const errors: Array<string> = [];
    _.each(rules, (rule: Joi.AnySchema, ctxPart) => {
      Joi.validate(
        _.get(ctx, ctxPart),
        rule,
        err => err && errors.push(err.message)
      );
      if (exitOnFirstError) {
        return;
      }
    });
    if (errors.length === 0) {
      return await next();
    }
    ctx.status = 400;
    ctx.body = {
      status: "error",
      errors: errors
    };
  };
}

export default validate;
