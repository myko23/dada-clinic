import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "route",
	initialState: {
		patienttab: false,
		view: "general",
		login: true,
		bigmodal: "default",
		confirm: {
			confirmmodal: false,
			confirmfunction: false,
		},
		route: "not test",
	},
	reducers: {
		patientTabToggled: (route, action) => {
			route.patienttab = !route.patienttab;
		},
		dataSet: (route, action) => {
			route.view = action.payload;
		},
		loggedInSet: (route, action) => {
			route.login = action.payload;
		},
		bigmodalSet: (route, action) => {
			route.bigmodal = action.payload;
		},
		confirmModalSet: (route, action) => {
			if (action.payload.confirmmodal !== 0)
				route.confirm.confirmmodal = action.payload.confirmmodal;
			if (action.payload.confirmfunction !== 0)
				route.confirm.confirmfunction = action.payload.confirmfunction;
		},
	},
});

export default slice.reducer;
const {
	patientTabToggled,
	dataSet,
	loggedInSet,
	bigmodalSet,
	confirmModalSet,
} = slice.actions;

export const togglePatientTab = (dispatch) => {
	dispatch(patientTabToggled());
};
export const setData = (dispatch) => (data) => {
	dispatch(dataSet(data));
};
export const setLogin = (dispatch) => (login) => {
	dispatch(loggedInSet(login));
};
export const setBigModal = (dispatch) => (bigmodal) => {
	dispatch(bigmodalSet(bigmodal));
};

export const setConfirmModal = (dispatch) => (modal, modalfunc) => {
	dispatch(
		confirmModalSet({ confirmmodal: modal, confirmfunction: modalfunc })
	);
};

export const getRouteState = (state) => state.route;
