import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddAdmissionMutation } from "../../../functions/apifunctions";
import { Notify } from "../../../functions/notificationfunctions";
import { setBigModal } from "../../../store/reducer/routereducer";
import { getSelectedState } from "../../../store/reducer/selectedreducer";
import DateInput from "../../common/DateInput/DateInput";
import DefaultButton from "../../common/DefaultButton/DefaultButton";
import DefaultInput from "../../common/DefaultInput/DefaultInput";
import LabelInput from "../../common/LabelInput/LabelInput";
import "./addadmissions.css";

const AddAdmissions = () => {
	const dispatch = useDispatch();
	const addAdmission = useAddAdmissionMutation();

	const { patient: selpatient } = useSelector(getSelectedState);

	const [dateadmission, setDateAdmission] = useState("06-23-1995");
	const [diagnosis, setDiagnosis] = useState("");

	useEffect(() => {
		resetForm();
	}, []);

	const resetForm = () => {
		setDateAdmission(moment().format("MM-DD-YYYY"));
		setDiagnosis("");
	};

	const addAdmissionButton = async () => {
		try {
			await addAdmission.mutateAsync({
				patient_id: selpatient,
				datestart: dateadmission,
				diagnosis,
			});
			Notify("admissions added", `${dateadmission} Added`, "success");
			setBigModal(dispatch)("default");
		} catch (err) {
			console.log(err.response.data);
			Notify("invalid data", "Please fill in required data", "error");
		}
	};

	return (
		<div className="fit addadmissions">
			<div className="addadmissions__header">Admit Patient</div>
			<div className="addadmissions__patient">
				<LabelInput label="patient" input="Jose Agerico Bacal" />
				<LabelInput label="age" input="21" />
			</div>
			<div className="forms fit addadmissions__form">
				<div className="form-row addadmissions__form-row">
					<DateInput
						label="Date of Admission"
						className="form-input addadmissions__form-input"
						state={dateadmission}
						setState={setDateAdmission}
					/>
				</div>
				<div className="form-row addadmissions__form-row">
					<DefaultInput
						label="Diagnosis"
						width="80rem"
						className="form-input addadmissions__form-input"
						state={diagnosis}
						setState={setDiagnosis}
					/>
				</div>
			</div>
			<div className="form-buttons addadmissions__form-buttons">
				<DefaultButton label="Add" onClick={addAdmissionButton} />
				<DefaultButton label="Reset" onClick={resetForm} />
				<DefaultButton
					label="Back"
					className="addadmissions__back-button"
					onClick={() => setBigModal(dispatch)("default")}
				/>
			</div>
		</div>
	);
};

export default AddAdmissions;
