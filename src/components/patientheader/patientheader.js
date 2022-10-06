import React from "react";
import { useGetFetchQuery } from "../../functions/apifunctions";
import { getFilterListByPatientID } from "../../functions/filterfunctions";
import LabelInput from "../common/LabelInput/LabelInput";
import "./patientheader.css";

const PatientHeader = ({ patient }) => {
	const admitData = useGetFetchQuery(["admissions"]);
	const getAdmitStatus = () => {
		if (patient) {
			const admit = getFilterListByPatientID(patient._id, admitData);
			if (admit.length === 0) return "Patient";
			else if (admit[admit.length - 1].dateend) return "Patient";
		}

		return "Admitted";
	};
	return (
		<div className="fit patientheader">
			<LabelInput
				label="Patient"
				width="50rem"
				input={
					patient
						? `${patient.firstname} ${patient.lastname}`
						: "DEFAULT PATIENT"
				}
			/>
			<LabelInput label="status" input={getAdmitStatus()} />
		</div>
	);
};

export default PatientHeader;
