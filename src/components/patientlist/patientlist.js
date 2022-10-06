import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFetchQuery } from "../../functions/apifunctions";
import {
	getfilterBySearch,
	getFilterListByPatientID,
} from "../../functions/filterfunctions";
import { getCurrentUserState } from "../../store/reducer/currentuser";
import {
	clearSelected,
	getSelectedState,
	setSelectedPatient,
} from "../../store/reducer/selectedreducer";
import PatientCard from "../patientcard/patientcard";
import "./patientlist.css";

const PatientList = ({ searchfield }) => {
	const { id: userId } = useSelector(getCurrentUserState);
	const patientsData = useGetFetchQuery(["patients", userId]);
	const consultData = useGetFetchQuery(["consultations"]);
	const { patient: selpatient } = useSelector(getSelectedState);
	const dispatch = useDispatch();

	let patientDataFiltered = getfilterBySearch(searchfield, patientsData);
	patientDataFiltered = _.sortBy(patientDataFiltered, ["lastname"]);

	const renderPatients = () => {
		if (patientsData && patientsData !== 0) {
			return patientDataFiltered.map((item) => {
				const lastcheckup = getFilterListByPatientID(
					item._id,
					consultData
				);

				return (
					<PatientCard
						key={item._id}
						id={item._id}
						selected={item._id === selpatient ? true : false}
						name={`${item.lastname}, ${item.firstname} `}
						birthday={item.birthday}
						onClick={() => {
							if (item._id !== selpatient) {
								clearSelected(dispatch);
								setSelectedPatient(dispatch)(item._id);
							}
						}}
						lastcheckup={
							lastcheckup[0]
								? lastcheckup[0].datecreated
								: undefined
						}
					/>
				);
			});
		} else {
			return <div className="patientlist__empty">Patient List Empty</div>;
		}
	};

	return <div className="fit patientlist">{renderPatients()}</div>;
};

export default PatientList;
