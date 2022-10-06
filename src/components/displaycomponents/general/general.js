import { faPencil, faRefresh } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useEditPatientMutation } from "../../../functions/apifunctions";
import { getAge } from "../../../functions/datefunctions";
import { Notify } from "../../../functions/notificationfunctions";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import "./general.css";

const General = ({ patient }) => {
	const editPatient = useEditPatientMutation();

	const [editstatus, setEditStatus] = useState(false);

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
		if (patient) {
			resetForm(patient);
		}
	}, [patient]);

	useEffect(() => {
		setAge(getAge(birthday));
	}, [birthday]);

	const resetForm = (patient) => {
		setEditStatus(false);
		setFirstName(patient.firstname);
		setMiddleName(patient.middlename);
		setLastName(patient.lastname);
		setBirthday(patient.birthday);
		setContact(patient.contact);
		setGuardian(patient.guardian);
		setRelationship(patient.relationship);
		setGuardianNo(patient.guardianno);
	};

	const editGeneralButton = async () => {
		if (!editstatus) {
			setEditStatus(!editstatus);
		} else {
			try {
				const newPatient = await editPatient.mutateAsync({
					id: patient._id,
					body: {
						firstname,
						middlename,
						lastname,
						contact,
						birthday,
						guardian,
						relationship,
						guardianno,
					},
				});
				Notify(
					"PATIENT EDITED",
					`${newPatient.data.firstname} ${newPatient.data.lastname} has been edited`
				);
				setEditStatus(!editstatus);
			} catch (err) {
				Notify("INVALID CHANGE", "Please Fill Up The Forms", "error");
			}
		}
	};

	return (
		<div className="fit general">
			<div className="forms general__form">
				<div className="form-row general__form-row">
					<DefaultInput
						label="First Name"
						width="40rem"
						className="form-input general__form-input"
						state={firstname}
						setState={setFirstName}
						edit={editstatus}
					/>
				</div>
				<div className="form-row general__form-row">
					<DefaultInput
						label="Middle Name"
						width="40rem"
						className="form-input general__form-input"
						state={middlename}
						setState={setMiddleName}
						edit={editstatus}
					/>
				</div>
				<div className="form-row general__form-row">
					<DefaultInput
						label="Last Name"
						width="40rem"
						className="form-input general__form-input"
						state={lastname}
						setState={setLastName}
						edit={editstatus}
					/>
				</div>
				<div className="form-row general__form-row">
					<DateInput
						label="Birthday"
						className="form-input general__form-input"
						state={birthday}
						setState={setBirthday}
						edit={editstatus}
					/>

					<DefaultInput
						label="Age"
						width="15rem"
						className="form-input general__form-input"
						state={age}
						setState={setAge}
						edit={false}
					/>
				</div>
				<div className="form-row general__form-row">
					<DefaultInput
						label="Contact No."
						width="30rem"
						className="form-input general__form-input"
						state={contact}
						setState={setContact}
						edit={editstatus}
					/>
				</div>
				<div className="form-row general__form-row">
					<DefaultInput
						label="Guardian / Emergency Contact"
						width="40rem"
						className="form-input general__form-input"
						state={guardian}
						setState={setGuardian}
						edit={editstatus}
					/>
					<DefaultInput
						label="Relationship"
						width="25rem"
						className="form-input general__form-input"
						state={relationship}
						setState={setRelationship}
						edit={editstatus}
					/>
				</div>
				<div className="form-row general__form-row">
					<DefaultInput
						label="Contact No."
						width="30rem"
						className="form-input general__form-input"
						state={guardianno}
						setState={setGuardianNo}
						edit={editstatus}
					/>
				</div>
			</div>
			'
			<div className="form-edit-buttons general__form-buttons">
				{editstatus ? (
					<DefaultButton
						label="Reset"
						width="12rem"
						className="general__edit-button"
						icon={faRefresh}
						onClick={() => {
							resetForm(patient);
						}}
					/>
				) : null}
				<DefaultButton
					label={!editstatus ? "Edit" : "Save"}
					width="12rem"
					className="general__edit-button"
					icon={faPencil}
					onClick={editGeneralButton}
				/>
			</div>
			'
		</div>
	);
};

export default General;
