import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBigModal } from "../../store/reducer/routereducer";
import DefaultButton from "../common/DefaultButton/DefaultButton";
import SearchInput from "../common/SearchInput/SearchInput";
import PatientList from "../patientlist/patientlist";
import "./patients.css";

const Patient = () => {
	const dispatch = useDispatch();

	const [searchfield, setSearchfield] = useState("");

	return (
		<div className="fit patients">
			<SearchInput
				className="patients__search"
				searchfield={searchfield}
				setSearchfield={setSearchfield}
			/>
			<PatientList searchfield={searchfield} />
			<DefaultButton
				className="patients__button"
				label="Add New Patient"
				width="90%"
				onClick={() => setBigModal(dispatch)("addpatient")}
			/>
		</div>
	);
};

export default Patient;
