import React from "react";
import Admissions from "../displaycomponents/admissions/admissions";
import Consultations from "../displaycomponents/consultations/consultations";
import General from "../displaycomponents/general/general";
import "./datadisplay.css";

const DataDisplay = ({ view, patient }) => {
	const renderDisplay = () => {
		switch (view) {
			case "general":
				return <General patient={patient} />;
			case "consultations":
				return <Consultations />;
			case "admissions":
				return <Admissions />;
			default:
				return <General />;
		}
	};
	return <div className="fit datadisplay">{renderDisplay()}</div>;
};

export default DataDisplay;
