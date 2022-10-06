import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { togglePatientTab } from "../../store/reducer/routereducer";
import UserSelect from "../userselect/userselect";
import "./topnav.css";

const TopNav = () => {
	const dispatch = useDispatch();

	return (
		<div className="fit topnav">
			<div
				className="topnav__patient-toggle-container"
				onClick={() => {
					togglePatientTab(dispatch);
				}}
			>
				<FontAwesomeIcon
					icon={faBars}
					className="topnav__patient-toggle"
				/>
				<div className="topnav__patient-label">Patients</div>
			</div>
			<UserSelect />
		</div>
	);
};

export default TopNav;
