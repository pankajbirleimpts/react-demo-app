import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ItemReducer from "./ItemReducer";
const rootReducer = combineReducers({
  user: UserReducer,
  item: ItemReducer
});
export default rootReducer;
