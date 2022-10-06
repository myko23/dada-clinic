import {
	faBedPulse,
	faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { setBigModal } from "../../store/reducer/routereducer";
import DefaultButton from "../common/DefaultButton/DefaultButton";
import "./databuttons.css";

const DataButtons = ({ edit }) => {
	const dispatch = useDispatch();

	return (
		<div className="fit databuttons">
			<DefaultButton
				label="Check Up / Consultation"
				className="databuttons__input"
				width="40rem"
				icon={faMagnifyingGlassPlus}
				onClick={() => setBigModal(dispatch)("addconsultations")}
			/>
			<DefaultButton
				label="Admit Patient"
				className="databuttons__input"
				width="40rem"
				icon={faBedPulse}
				onClick={() => setBigModal(dispatch)("addadmissions")}
			/>
		</div>
	);
};

export default DataButtons;
