import { faPencil, faRefresh } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	useEditAdmissionsMutation,
	useGetFetchQuery,
} from "../../../functions/apifunctions";
import {
	formatFormalDate,
	getDateDiff,
} from "../../../functions/datefunctions";
import {
	getDataByID,
	getFilterListByPatientID,
} from "../../../functions/filterfunctions";
import { Notify } from "../../../functions/notificationfunctions";
import { getSelectedState } from "../../../store/reducer/selectedreducer";
import AdmissionsList from "../../admissionslist/admissionslist";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import "./admissions.css";

const Admissions = () => {
	const editPatient = useEditAdmissionsMutation();

	const admitData = useGetFetchQuery(["admissions"]);
	const { patient: selpatient, admit: seladmit } =
		useSelector(getSelectedState);

	const filterAdmitID = getFilterListByPatientID(selpatient, admitData);
	const admission = getDataByID(seladmit, admitData);

	const [editstatus, setEditStatus] = useState(false);

	const [dateadmission, setDateAdmission] = useState("06-23-1995");
	const [datedischarge, setDateDischarge] = useState("06-23-1996");
	const [duration, setDuration] = useState("");
	const [diagnosis, setDiagnosis] = useState("");
	const [disposition, setDisposition] = useState("");
	const [disdatedischarge, setDisDateDischarge] = useState("");
	const [disdisposition, setDisDisposition] = useState("");

	useEffect(() => {
		if (admission) {
			resetForm(admission);
		}
	}, [admission]);

	useEffect(() => {
		if (datedischarge !== "NA") {
			setDuration(getDateDiff(dateadmission, datedischarge));
		}
	}, [dateadmission, datedischarge]);

	useEffect(() => {
		setDisDateDischarge(moment().format("MM-DD-YYYY"));
		setDisDisposition("");
	}, []);

	const resetForm = (admission) => {
		setEditStatus(false);
		setDateAdmission(admission.datestart);
		setDateDischarge(admission.dateend ? admission.dateend : "");
		setDuration(
			admission.dateend
				? getDateDiff(admission.datestart, admission.dateend)
				: ""
		);
		setDiagnosis(admission.diagnosis || "");
		setDisposition(admission.disposition || "");
	};

	const renderEmptyAdmissions = () => {
		if (!admission) {
			return (
				<div className="fit fc admissions--empty">
					Please Select Admission
				</div>
			);
		}
	};

	const editAdmissionButton = async () => {
		if (!editstatus) {
			setEditStatus(!editstatus);
		} else {
			const body = {
				patient_id: selpatient,
				datestart: dateadmission,
				diagnosis,
			};
			if (datedischarge !== "") _.merge(body, { dateend: datedischarge });
			if (disposition !== "") _.merge(body, { disposition });

			try {
				await editPatient.mutateAsync({
					id: admission._id,
					body,
				});
				Notify(
					"Admission EDITED",
					`${formatFormalDate(dateadmission)}  has been edited`
				);
				setEditStatus(!editstatus);
			} catch (err) {
				console.log("ERROR", err.response.data);
				Notify("INVALID CHANGE", "Please Fill Up The Forms", "error");
			}
		}
	};

	const dischargePatientButton = async () => {
		console.log({
			patient_id: selpatient,
			datestart: dateadmission,
			diagnosis,
			dateend: disdatedischarge,
			disposition: disdisposition,
		});
		try {
			await editPatient.mutateAsync({
				id: admission._id,
				body: {
					patient_id: selpatient,
					datestart: dateadmission,
					diagnosis,
					dateend: disdatedischarge,
					disposition: disdisposition,
				},
			});
			setEditStatus(false);
			Notify(
				"Admission Discharged",
				`${formatFormalDate(dateadmission)}  has been discharged`
			);
			setEditStatus(!editstatus);
		} catch (err) {
			console.log("ERROR", err.response.data);
			Notify("INVALID CHANGE", "Please Fill Up The Data", "error");
		}
	};

	return (
		<div className="fit admissions">
			<div className="admissions__table">
				<div className="fc fit admissions__table-header">
					admissions
				</div>
				<AdmissionsList data={filterAdmitID} />
			</div>
			<div className="fit admissions__container">
				{renderEmptyAdmissions()}
				<div className="fit forms admissions__forms">
					<div className="form-row admissions__form-row">
						<DateInput
							label="Date of Admission"
							className="form-input admissions__form-input"
							state={dateadmission}
							setState={setDateAdmission}
							edit={editstatus}
						/>
					</div>
					<div className="form-row admissions__form-row">
						{datedischarge !== "" ? (
							<DateInput
								label="Date of Discharge"
								className="form-input admissions__form-input"
								state={datedischarge}
								setState={setDateDischarge}
								edit={editstatus}
							/>
						) : null}
					</div>
					<div className="form-row admissions__form-row">
						{datedischarge !== "" ? (
							<DefaultInput
								label="Duration"
								width="20rem"
								className="form-input admissions__form-input"
								state={duration}
								setState={setDuration}
								edit={false}
							/>
						) : null}
					</div>
					<div className="form-row admissions__form-row">
						<DefaultInput
							label="Diagnosis"
							width="40rem"
							className="form-input admissions__form-input"
							state={diagnosis}
							setState={setDiagnosis}
							edit={editstatus}
						/>
					</div>
					<div className="form-row admissions__form-row">
						{datedischarge !== "" ? (
							<DefaultInput
								label="Disposition"
								width="40rem"
								className="form-input admissions__form-input"
								state={disposition}
								setState={setDisposition}
								edit={editstatus}
							/>
						) : null}
					</div>
					<div className="form-edit-buttons admissions__form-buttons">
						{editstatus ? (
							<DefaultButton
								label="Reset"
								width="12rem"
								className="admissions__edit-button"
								icon={faRefresh}
								onClick={() => {
									resetForm(admission);
								}}
							/>
						) : null}
						<DefaultButton
							label={!editstatus ? "Edit" : "Save"}
							width="12rem"
							className="admissions__edit-button"
							icon={faPencil}
							onClick={editAdmissionButton}
						/>
					</div>
				</div>
				{datedischarge === "" ? (
					<div className="admissions__discharge">
						<DateInput
							label="date discharge"
							state={disdatedischarge}
							setState={setDisDateDischarge}
						/>

						<div className="admissons__discharge-sub-content">
							<DefaultInput
								label="Disposition"
								width="20rem"
								state={disdisposition}
								setState={setDisDisposition}
							/>
							<DefaultButton
								label="Discharge"
								width="20rem"
								onClick={dischargePatientButton}
							/>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Admissions;
