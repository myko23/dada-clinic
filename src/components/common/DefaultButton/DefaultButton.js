import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./DefaultButton.css";

const DefaultButton = ({ label, className, width, icon, onClick }) => {
	return (
		<div
			className={"defaultbutton " + (className || "")}
			style={{ width: width || "20rem" }}
			onClick={onClick}
		>
			<FontAwesomeIcon
				className="defaultbutton__icon"
				icon={icon || faSearch}
			/>
			<div className="defaultbutton__button">{label || "Submit"}</div>
		</div>
	);
};

export default DefaultButton;
