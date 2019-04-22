import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { reducer } from "./default/state";

const rootReducer = () =>
  combineReducers({
    reducer: reducer
  });

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
export type RootState = StateType<ReturnType<typeof rootReducer>>;

export default rootReducer;
