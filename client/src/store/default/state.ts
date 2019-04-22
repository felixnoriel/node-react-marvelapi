import {
  ActionType,
  createAsyncAction,
  getType,
  createStandardAction
} from "typesafe-actions";
import Service from "../api/Service";
import { ThunkAction } from "redux-thunk";
import Router from "next/router";
import * as _ from "lodash";

export const listAction = createAsyncAction(
  "list/REQUEST",
  "list/SUCCESS",
  "list/FAILURE"
)<void, Array<any>, Error>();

export const singleObjectAction = createAsyncAction(
  "singleObject/REQUEST",
  "singleObject/SUCCESS",
  "singleObject/FAILURE"
)<void, Array<any>, Error>();

export type List = ActionType<typeof listAction>;
export type SingleObject = ActionType<typeof singleObjectAction>;
export const resetDataAction = createStandardAction("resetData")<void>();
export type ResetDataAction = ActionType<typeof resetDataAction>;
export type DefaultAction = List | SingleObject | ResetDataAction;

export type DefaultState = {
  list?: Array<any>;
  singleObject?: any;
  loadingList: boolean;
  loadingSingleObject: boolean;
};

const initialState: DefaultState = {
  loadingList: false,
  loadingSingleObject: false
};

export const reducer = (
  state: DefaultState = initialState,
  action: DefaultAction
) => {
  switch (action.type) {
    case getType(listAction.request): {
      return { ...state, loadingList: true };
    }

    case getType(listAction.success): {
      return { ...state, loadingList: false, list: action.payload };
    }

    case getType(singleObjectAction.request): {
      return { ...state, loadingSingleObject: true };
    }

    case getType(singleObjectAction.success): {
      return {
        ...state,
        loadingSingleObject: false,
        singleObject: action.payload
      };
    }

    case getType(resetDataAction): {
      return initialState;
    }
  }
  return state;
};

export type DefaultDependencies = {
  service: Service;
  storage: StoreJsAPI;
};

/**
 * Get data list by entity type
 * @param entityType
 */
export function getList(
  entityType: string
): ThunkAction<void, DefaultState, DefaultDependencies, DefaultAction> {
  return async (dispatch, getState, deps) => {
    dispatch(listAction.request());
    await deps.service
      .fetchList(entityType)
      .then(data => dispatch(listAction.success(data)))
      .catch(err => dispatch(listAction.failure(err.message)));
  };
}

/**
 * Get the object data by entity type and entity id
 * @param entityType
 * @param entityId
 */
export function getObject(
  entityType: string,
  entityId: number
): ThunkAction<void, DefaultState, DefaultDependencies, DefaultAction> {
  return async (dispatch, getState, deps) => {
    dispatch(singleObjectAction.request());
    await deps.service
      .fetchObject(entityType, entityId)
      .then(data => dispatch(singleObjectAction.success(data)))
      .catch(err => dispatch(singleObjectAction.failure(err.message)));
  };
}

/**
 * Resets the state to its default
 */
export function resetData(): ThunkAction<
  void,
  DefaultState,
  DefaultDependencies,
  DefaultAction
> {
  return async (dispatch, getState, deps) => {
    await dispatch(resetDataAction());
  };
}
