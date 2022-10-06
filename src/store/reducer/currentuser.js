import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "currentuser",
	initialState: { id: "", email: "", name: "", title: "" },
	reducers: {
		currentUserSet: (currentuser, action) => {
			currentuser.email = action.payload.email;
			currentuser.name = action.payload.name;
			currentuser.title = action.payload.title;
			currentuser.id = action.payload._id;
		},
		currentUserClear: (currentuser, action) => {
			currentuser.email = "";
			currentuser.name = "";
			currentuser.title = "";
			currentuser.id = "";
		},
	},
});

export default slice.reducer;
const { currentUserSet, currentUserClear } = slice.actions;

export const setCurrentUser = (dispatch) => (body) => {
	dispatch(currentUserSet(body));
};

export const clearCurrentUser = (dispatch) => {
	dispatch(currentUserClear());
};

export const getCurrentUserState = (state) => state.currentuser;
