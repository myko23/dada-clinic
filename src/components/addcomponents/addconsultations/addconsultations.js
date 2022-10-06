import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useAddConsultationMutation,
	useGetFetchQuery,
} from "../../../functions/apifunctions";
import { getDataByID } from "../../../functions/filterfunctions";
import { Notify } from "../../../functions/notificationfunctions";
import { setBigModal } from "../../../store/reducer/routereducer";
import { getSelectedState } from "../../../store/reducer/selectedreducer";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import LabelInput from "../../common/LabelInput/LabelInput";
import "./addconsultations.css";

const AddConsultations = () => {
	const dispatch = useDispatch();
	const addConsultation = useAddConsultationMutation();

	const { patient: selpatient } = useSelector(getSelectedState);
	const patientData = useGetFetchQuery(["patients"]);

	const patient = getDataByID(selpatient, patientData);

	const [dateofconsultation, setDateOfConsultation] = useState("");
	const [chiefcomplaint, setChiefComplaint] = useState("");
	const [subjective, setSubjective] = useState("");
	const [objective, setObjective] = useState("");
	const [assessment, setAssessment] = useState("");
	const [plan, setPlan] = useState("");

	useEffect(() => {
		resetForm();
	}, []);

	const resetForm = (consultation) => {
		setDateOfConsultation(moment().format("MM-DD-YYYY"));
		setChiefComplaint("");
		setSubjective("");
		setObjective("");
		setAssessment("");
		setPlan("");
	};

	const addConsultationButton = async () => {
		try {
			await addConsultation.mutateAsync({
				datecreated: dateofconsultation,
				patient_id: selpatient,
				chiefcomplaint,
				subjective,
				objective,
				assessment,
				plan,
			});
			Notify(
				"consultations added",
				`${dateofconsultation} Added`,
				"success"
			);
			setBigModal(dispatch)("default");
		} catch (err) {
			console.log(err.response.data);
			Notify("invalid data", "Please fill in required data", "error");
		}
	};
	return (
		<div className="fit addconsultations">
			<div className="addconsultations__header">Check Up Patient</div>
			<div className="addconsultations__patient">
				<LabelInput
					label="patient"
					input={
						patient
							? `${patient.firstname} ${patient.lastname}`
							: "Default Patient"
					}
				/>
				<LabelInput
					label="age"
					input={
						patient
							? moment(patient.birthday, "MM-DD-YYYY").fromNow(
									true
							  )
							: "Default Age"
					}
				/>
			</div>
			<div className="forms fit addconsultations__form">
				<div className="form-row addconsultations__form-row">
					<DateInput
						label="Date of Consultation"
						className="form-input addconsultations__form-input"
						state={dateofconsultation}
						setState={setDateOfConsultation}
					/>
				</div>
				<div className="form-row addconsultations__form-row">
					<DefaultInput
						label="Chief Complaint"
						width="80rem"
						className="form-input addconsultations__form-input"
						state={chiefcomplaint}
						setState={setChiefComplaint}
					/>
				</div>
				<div className="form-row addconsultations__form-row">
					<DefaultInput
						label="Subjective"
						width="80rem"
						className="form-input addconsultations__form-input"
						state={subjective}
						setState={setSubjective}
					/>
				</div>
				<div className="form-row addconsultations__form-row">
					<DefaultInput
						label="Objective"
						width="80rem"
						className="form-input addconsultations__form-input"
						state={objective}
						setState={setObjective}
					/>
				</div>
				<div className="form-row addconsultations__form-row">
					<DefaultInput
						label="Assessment"
						width="80rem"
						className="form-input addconsultations__form-input"
						state={assessment}
						setState={setAssessment}
					/>
				</div>
				<div className="form-row addconsultations__form-row">
					<DefaultInput
						label="Plan"
						width="80rem"
						className="form-input addconsultations__form-input"
						state={plan}
						setState={setPlan}
					/>
				</div>
			</div>
			<div className="form-buttons addconsultations__form-buttons">
				<DefaultButton label="Add" onClick={addConsultationButton} />
				<DefaultButton label="Reset" onClick={resetForm} />
				<DefaultButton
					label="Back"
					className="addconsultations__back-button"
					onClick={() => setBigModal(dispatch)("default")}
				/>
			</div>
		</div>
	);
};

export default AddConsultations;
