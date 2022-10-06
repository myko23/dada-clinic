import React from "react";
import "./LabelInput.css";

const LabelInput = ({ label, input, width }) => {
	return (
		<div className="labelinput" style={{ width: width || "30rem" }}>
			<div className="labelinput__label">{label || "label"}</div>
			<div className="labelinput__input">{input || "Input"}</div>
		</div>
	);
};

export default LabelInput;
