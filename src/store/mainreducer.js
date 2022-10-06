import { combineReducers } from "redux";
import selectedreducer from "./reducer/selectedreducer";
import routereducer from "./reducer/routereducer";
import datareducer from "./reducer/datareducer";
import currentuser from "./reducer/currentuser";

export default combineReducers({
	selected: selectedreducer,
	route: routereducer,
	data: datareducer,
	currentuser: currentuser,
});
