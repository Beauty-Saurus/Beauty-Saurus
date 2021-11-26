import { combineReducers } from "redux";
import jsonReducer from "./jsonState";

const rootReducer = combineReducers({
	jsonReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
