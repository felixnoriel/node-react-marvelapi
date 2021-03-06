import { applyMiddleware, compose, createStore, Store } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";
import { DefaultDependencies } from "./default/state";

export type RootServiceDependencies = DefaultDependencies;

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(
  dependencies: RootServiceDependencies,
  initialState?: {}
) {
  const deps: RootServiceDependencies = {
    service: dependencies.service,
    storage: dependencies.storage
  };

  // configure middlewares
  const middlewares = [ReduxThunk.withExtraArgument(deps)];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer(), initialState!, enhancer);
}

let createdStore: Store;

// pass an optional param to rehydrate state on app start
const store = (deps: RootServiceDependencies, initialState?: any) => {
  if (createdStore != undefined) {
    return createdStore;
  }
  createdStore = configureStore(deps, initialState);
  return createdStore;
};

// export store singleton instance
export default store;
