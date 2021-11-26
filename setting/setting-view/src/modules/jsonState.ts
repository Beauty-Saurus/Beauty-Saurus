import { ActionType, createAction, createReducer } from "typesafe-actions";
import wholeJSON from "../../beauty.saurus.config.json";
import client from "../lib/api/client";
import { resetSettingsAPI } from "../lib/api/feature";
import { FeatureType, WholeJSONType } from "../types/wholeJson";

const INITIALIZE_STATE = "jsonState/INITIALIZE_STATE";
const ADDFEATURE_STATE = "jsonState/ADDFEATURE_STATE";
const SUBMIT_STATE = "jsonState/SUBMIT_STATE";

export const initializeState = createAction(
  INITIALIZE_STATE,
  (newState: WholeJSONType) => {
    resetSettingsAPI(newState);
    return newState;
  }
)();

export const addFeatureState = createAction(
  ADDFEATURE_STATE,
  (state: FeatureType) => state
)();

export const submitState = createAction(SUBMIT_STATE)<WholeJSONType>();

export const actions = {
  initializeState,
  addFeatureState,
  submitState,
};

type ReduxAction = ActionType<typeof actions>;

const initialState: WholeJSONType = wholeJSON;

function applyEntries(reqData, targetJSON) {
  const reqEntries = Object.entries(reqData);
  reqEntries.forEach((entry) => {
    const [key, value] = entry;
    if (typeof value == "object") applyEntries(value, targetJSON[key]);
    else targetJSON[key] = reqData[key];
  });
  return targetJSON;
}

const jsonReducer = createReducer<WholeJSONType, ReduxAction>(initialState, {
  [INITIALIZE_STATE]: (state, { payload }) => (state = payload),
  [ADDFEATURE_STATE]: (state, { payload }) => {
    const newState = {
      ...state,
      feature: payload,
    };
    return newState;
  },
  [SUBMIT_STATE]: (state: WholeJSONType, { payload }) => {
    const targetJSON = wholeJSON;
    applyEntries(payload, targetJSON);
    client.post("/api/config", targetJSON);
    return targetJSON;
  },
});

export default jsonReducer;
