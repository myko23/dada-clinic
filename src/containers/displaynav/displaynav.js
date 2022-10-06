import React from "react";
import { useSelector } from "react-redux";
import DataButtons from "../../components/databuttons/databuttons";
import DataDisplay from "../../components/datadisplay/datadisplay";
import DataNav from "../../components/datanav/datanav";
import PatientHeader from "../../components/patientheader/patientheader";
import { useGetFetchQuery } from "../../functions/apifunctions";
import { getDataByID } from "../../functions/filterfunctions";
import { getCurrentUserState } from "../../store/reducer/currentuser";
import { getSelectedState } from "../../store/reducer/selectedreducer";
import "./displaynav.css";

const DisplayNav = ({ view }) => {
	const { patient: selpatient } = useSelector(getSelectedState);
	const { id: userId } = useSelector(getCurrentUserState);
	const patientData = useGetFetchQuery(["patients", userId]);
	const patient = getDataByID(selpatient, patientData);

	const renderEmptyDisplayNav = () => {
		if (patient === undefined)
			return (
				<div className="fit fc displaynav--empty">
					Please Select a Patient
				</div>
			);
	};

	return (
		<div className="fit displaynav">
			{renderEmptyDisplayNav()}
			<div className="displaynav__datanav">
				<DataNav view={view} />
			</div>
			<div className="displaynav__header">
				<PatientHeader patient={patient} />
			</div>
			<div className="displaynav__data">
				<DataDisplay view={view} patient={patient} />
			</div>
			<div className="displaynav__button-container">
				<DataButtons />
			</div>
		</div>
	);
};

export default DisplayNav;
