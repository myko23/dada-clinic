import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "selected",
	initialState: { patient: 0, consult: 0, admit: 0 },
	reducers: {
		selectedPatientSet: (selected, action) => {
			selected.patient = action.payload;
		},
		selectedConsultationSet: (selected, action) => {
			selected.consult = action.payload;
		},
		selectedAdmissionSet: (selected, action) => {
			selected.admit = action.payload;
		},
		selectedCleared: (selected, action) => {
			selected.admit = 0;
			selected.consult = 0;
			selected.patient = 0;
		},
	},
});

export default slice.reducer;
const {
	selectedPatientSet,
	selectedConsultationSet,
	selectedAdmissionSet,
	selectedCleared,
} = slice.actions;

export const setSelectedPatient = (dispatch) => (id) => {
	dispatch(selectedPatientSet(id));
};
export const setSelectedConsultation = (dispatch) => (id) => {
	dispatch(selectedConsultationSet(id));
};
export const setSelectedAdmission = (dispatch) => (id) => {
	dispatch(selectedAdmissionSet(id));
};
export const clearSelected = (dispatch) => {
	dispatch(selectedCleared());
};

export const getSelectedState = (state) => state.selected;
