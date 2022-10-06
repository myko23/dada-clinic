import {
	faBedPulse,
	faLaptopMedical,
	faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../store/reducer/routereducer";
import "./datanav.css";

const DataNav = ({ view }) => {
	const dispatch = useDispatch();
	return (
		<div className="fit datanav">
			<div
				className={
					"datanav__nav " +
					(view === "general" ? "datanav__nav--selected" : "")
				}
				onClick={() => {
					if (view !== "general") {
						setData(dispatch)("general");
					}
				}}
			>
				<FontAwesomeIcon icon={faUserTie} />
			</div>
			<div
				className={
					"datanav__nav " +
					(view === "consultations" ? "datanav__nav--selected" : "")
				}
				onClick={() => {
					if (view !== "consultations") {
						setData(dispatch)("consultations");
					}
				}}
			>
				<FontAwesomeIcon icon={faLaptopMedical} />
			</div>
			<div
				className={
					"datanav__nav " +
					(view === "admissions" ? "datanav__nav--selected" : "")
				}
				onClick={() => {
					if (view !== "admissions") {
						setData(dispatch)("admissions");
					}
				}}
			>
				<FontAwesomeIcon icon={faBedPulse} />
			</div>
		</div>
	);
};

export default DataNav;
