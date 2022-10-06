import { faPencil, faRefresh } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	useEditConsultationMutation,
	useGetFetchQuery,
} from "../../../functions/apifunctions";
import { formatFormalDate } from "../../../functions/datefunctions";
import {
	getDataByID,
	getFilterListByPatientID,
} from "../../../functions/filterfunctions";
import { Notify } from "../../../functions/notificationfunctions";
import { getSelectedState } from "../../../store/reducer/selectedreducer";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import ConsultationsList from "../../consultationslist/consultationslist";
import "./consultations.css";

const Consultations = () => {
	const editConsult = useEditConsultationMutation();

	const consultData = useGetFetchQuery(["consultations"]);
	const { patient: selpatient, consult: selconsult } =
		useSelector(getSelectedState);

	const filterConsultData = getFilterListByPatientID(selpatient, consultData);
	const consultation = getDataByID(selconsult, consultData);

	const [editstatus, setEditStatus] = useState(false);

	const [dateofconsultation, setDateOfConsultation] = useState("");
	const [chiefcomplaint, setChiefComplaint] = useState("");
	const [subjective, setSubjective] = useState("");
	const [objective, setObjective] = useState("");
	const [assessment, setAssessment] = useState("");
	const [plan, setPlan] = useState("");

	useEffect(() => {
		if (consultation) {
			resetForm(consultation);
		} else {
			setDateOfConsultation("");
			setChiefComplaint("");
			setSubjective("");
			setObjective("");
			setAssessment("");
			setPlan("");
		}
	}, [consultation]);

	const resetForm = (consultation) => {
		setEditStatus(false);
		setDateOfConsultation(consultation.datecreated);
		setChiefComplaint(consultation.chiefcomplaint);
		setSubjective(consultation.subjective);
		setObjective(consultation.objective);
		setAssessment(consultation.assessment);
		setPlan(consultation.plan);
	};

	const renderEmptyConsultation = () => {
		if (!consultation) {
			return (
				<div className="fit fc consultations--empty">
					Please Select Consultation
				</div>
			);
		}
	};

	const editConsultationButton = async () => {
		if (!editstatus) {
			setEditStatus(!editstatus);
		} else {
			try {
				await editConsult.mutateAsync({
					id: consultation._id,
					body: {
						datecreated: dateofconsultation,
						patient_id: selpatient,
						chiefcomplaint,
						subjective,
						objective,
						assessment,
						plan,
					},
				});
				Notify(
					"Consultation EDITED",
					`${formatFormalDate(dateofconsultation)}  has been edited`
				);
				setEditStatus(!editstatus);
			} catch (err) {
				console.log("ERROR", err.response.data);
				Notify("INVALID CHANGE", "Please Fill Up The Forms", "error");
			}
		}
	};

	return (
		<div className="fit consultations">
			<div className="consultations__table">
				<div className="fc fit consultations__table-header">
					Consultation
				</div>
				<ConsultationsList data={filterConsultData} />
			</div>
			<div className="forms fit consultations__forms">
				{renderEmptyConsultation()}

				<div className="form-row consultations__form-row">
					<DateInput
						label="Date of Consultation"
						className="form-input consultations__form-input"
						state={dateofconsultation}
						setState={setDateOfConsultation}
						edit={editstatus}
					/>
				</div>
				<div className="form-row consultations__form-row">
					<DefaultInput
						label="Chief Complaint"
						width="40rem"
						className="form-input consultations__form-input"
						state={chiefcomplaint}
						setState={setChiefComplaint}
						edit={editstatus}
					/>
				</div>
				<div className="form-row consultations__form-row">
					<DefaultInput
						label="Subjective"
						width="40rem"
						className="form-input consultations__form-input"
						state={subjective}
						setState={setSubjective}
						edit={editstatus}
					/>
				</div>
				<div className="form-row consultations__form-row">
					<DefaultInput
						label="Objective"
						width="40rem"
						className="form-input consultations__form-input"
						state={objective}
						setState={setObjective}
						edit={editstatus}
					/>
				</div>
				<div className="form-row consultations__form-row">
					<DefaultInput
						label="Assessment"
						width="40rem"
						className="form-input consultations__form-input"
						state={assessment}
						setState={setAssessment}
						edit={editstatus}
					/>
				</div>
				<div className="form-row consultations__form-row">
					<DefaultInput
						label="Plan"
						width="40rem"
						className="form-input consultations__form-input"
						state={plan}
						setState={setPlan}
						edit={editstatus}
					/>
				</div>

				<div className="form-edit-buttons consultations__form-buttons">
					{editstatus ? (
						<DefaultButton
							label="Reset"
							width="12rem"
							className="consultations__edit-button"
							icon={faRefresh}
							onClick={() => {
								resetForm(consultation);
							}}
						/>
					) : null}
					<DefaultButton
						label={!editstatus ? "Edit" : "Save"}
						width="12rem"
						className="consultations__edit-button"
						icon={faPencil}
						onClick={editConsultationButton}
					/>
				</div>
			</div>
		</div>
	);
};

export default Consultations;
