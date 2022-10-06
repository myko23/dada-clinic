import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "data",
	initialState: { patientsearchfield: "" },
	reducers: {
		searchfieldSet: (data, action) => {
			data.patientsearchfield = action.payload;
		},
	},
});

export default slice.reducer;
const { searchfieldSet } = slice.actions;

export const setSearchfield = (dispatch) => (searchfield) => {
	dispatch(searchfieldSet(searchfield));
};

export const getDataState = (state) => state.data;
