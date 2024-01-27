import { combineReducers } from "redux";
import { todoListReducer } from "./todoListReducer";

const reducers = combineReducers({
  todos: todoListReducer,
});

export default reducers;
