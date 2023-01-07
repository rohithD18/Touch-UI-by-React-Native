import { legacy_createStore } from "redux";
import rootReducer from "./reducers/RootReducer";

const Store = legacy_createStore(rootReducer);

export default Store;