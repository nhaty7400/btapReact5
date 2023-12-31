import { createStore, combineReducers } from "redux";
import { quanLySinhVienReducer } from "./QLSV/QLSV.reducer";

const rootReducer = combineReducers({
  quanLySinhVienReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);