import { combineReducers } from "redux";
import { loginReducer } from "./LoginReducer";
import { feedsReducer } from "./FeedsReducer";
import { postDetailsReducer } from "./PostDetailsReducer";

const rootReducer = combineReducers({
    loginReducer,
    feedsReducer,
    postDetailsReducer,
});

export default rootReducer;
