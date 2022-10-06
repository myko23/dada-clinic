import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddPatientMutation } from "../../../functions/apifunctions";
import { getAge } from "../../../functions/datefunctions";
import { Notify } from "../../../functions/notificationfunctions";
import { getCurrentUserState } from "../../../store/reducer/currentuser";
import { setBigModal } from "../../../store/reducer/routereducer";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import "./addpatients.css";

const AddPatients = () => {
	const addPatient = useAddPatientMutation();
	const dispatch = useDispatch();
	const { id: userId } = useSelector(getCurrentUserState);

	const [firstname, setFirstName] = useState("");
	const [middlename, setMiddleName] = useState("");
	const [lastname, setLastName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [age, setAge] = useState("");
	const [contact, setContact] = useState("");
	const [guardian, setGuardian] = useState("");
	const [relationship, setRelationship] = useState("");
	const [guardianno, setGuardianNo] = useState("");

	useEffect(() => {
		setFirstName("");
		setMiddleName("");
		setLastName("");
		setBirthday("06-23-1996");
		setContact("");
		setGuardian("");
		setRelationship("");
		setGuardianNo("");
	}, []);

	useEffect(() => {
		setAge(getAge(birthday));
	}, [birthday]);

	const dataReset = () => {
		setFirstName("");
		setMiddleName("");
		setLastName("");
		setBirthday("06-23-1996");
		setContact("");
		setGuardian("");
		setRelationship("");
		setGuardianNo("");
	};
	const addPatientButton = async () => {
		try {
			await addPatient.mutateAsync({
				user_id: userId,
				firstname,
				middlename,
				lastname,
				contact,
				birthday,
				guardian,
				relationship,
				guardianno,
			});
			Notify(
				"patient added",
				`${firstname} ${lastname} Added`,
				"success"
			);
			setBigModal(dispatch)("default");
		} catch (err) {
			console.log(err.response.data);
			Notify("invalid data", "Please fill in required data", "error");
		}
	};
	return (
		<div className="fit addpatients">
			<div className="addpatients__header">NEW PATIENTS</div>
			<div className="forms fit addpatients__form">
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="First Name (required)"
						width="40rem"
						className="form-input addpatients__form-input"
						state={firstname}
						setState={setFirstName}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="Middle Name"
						width="40rem"
						className="form-input addpatients__form-input"
						state={middlename}
						setState={setMiddleName}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="Last Name (required)"
						width="40rem"
						className="form-input addpatients__form-input"
						state={lastname}
						setState={setLastName}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DateInput
						label="Birthday (required)"
						width="30rem"
						className="form-input addpatients__form-input"
						state={birthday}
						setState={setBirthday}
					/>
					<DefaultInput
						label="Age"
						width="15rem"
						className="form-input addpatients__form-input"
						edit={false}
						state={age}
						setState={setAge}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="Contact No."
						width="30rem"
						className="form-input addpatients__form-input"
						state={contact}
						setState={setContact}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="Guardian / Emergency Contact"
						width="40rem"
						className="form-input addpatients__form-input"
						state={guardian}
						setState={setGuardian}
					/>
					<DefaultInput
						label="Relationship"
						width="25rem"
						className="form-input addpatients__form-input"
						state={relationship}
						setState={setRelationship}
					/>
				</div>
				<div className="form-row addpatients__form-row">
					<DefaultInput
						label="Contact No."
						width="30rem"
						className="form-input addpatients__form-input"
						state={guardianno}
						setState={setGuardianNo}
					/>
				</div>
			</div>
			<div className="form-buttons addpatients__form-buttons">
				<DefaultButton label="Add" onClick={addPatientButton} />
				<DefaultButton label="Reset" onClick={dataReset} />
				<DefaultButton
					label="Back"
					className="addpatients__back-button"
					onClick={() => setBigModal(dispatch)("default")}
				/>
			</div>
		</div>
	);
};

export default AddPatients;
