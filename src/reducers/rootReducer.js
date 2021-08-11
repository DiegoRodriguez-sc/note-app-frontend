import { combineReducers } from "redux";
import { authReducers } from "./authReducer";
import { noteReducer } from "./noteReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
  auth:authReducers,
  ui:uiReducer,
  note:noteReducer
})