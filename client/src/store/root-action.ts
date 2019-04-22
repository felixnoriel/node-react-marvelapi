import { RouterAction, LocationChangeAction } from "react-router-redux";

import { DefaultAction } from "./default/state";

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | DefaultAction;
