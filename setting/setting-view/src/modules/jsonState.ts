import { ActionType, createAction, createReducer } from "typesafe-actions";
import wholeJSON from "../../beauty.saurus.config.json";
import { resetSettingsAPI } from "../lib/api/feature";
import {
  FeatureType,
  FooterType,
  HeaderType,
  MetaType,
  NavbarType,
  WholeJSONType,
} from "../types/wholeJson";

// 액션의 이름으로, 보통 "파일명/액션이름" 으로 써유
const INITIALIZE_STATE = "jsonState/INITIALIZE_STATE";
const ADDFEATURE_STATE = "jsonState/ADDFEATURE_STATE";
const SUBMIT_STATE = "jsonState/SUBMIT_STATE";

// 액션을 만들어주는 함수
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

export const submitState = createAction(SUBMIT_STATE)<
  MetaType | NavbarType | HeaderType | FeatureType | FooterType,
  "meta" | "navbar" | "feature" | "footer"
>();

// 액션들 여러 개 생기면 객체화해서 편하게 쓸라고 묶어 주는거
export const actions = { initializeState, addFeatureState, submitState };
// 액션의 타입 맨드러주는거
type ReduxAction = ActionType<typeof actions>;

const initialState: WholeJSONType = wholeJSON;

// reducer 만들어주는건데 여기서 쓰이는 state는 이전 상태로 보면 되고, payload는 상태 중에서 바꿔주고 싶은 데이터를 가지고 있는 애
const jsonReducer = createReducer<WholeJSONType, ReduxAction>(initialState, {
  [INITIALIZE_STATE]: (state, { payload }) => (state = payload),
  [ADDFEATURE_STATE]: (state, { payload }) => {
    state.feature = payload;
    return state;
  },
  [SUBMIT_STATE]: (
    state: Pick<WholeJSONType, "meta" | "feature" | "header" | "navbar">,
    { payload, meta }
  ) => {
    state[meta] = payload;
    resetSettingsAPI(state);
    return state;
  },
});

export default jsonReducer;
