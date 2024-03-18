import { createStore } from "redux";
import middleware from "../middleware/index";
import reducer from "../reducers/index";

const store = createStore(reducer, middleware);

export default store;
