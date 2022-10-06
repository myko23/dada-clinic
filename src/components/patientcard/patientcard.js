import React from "react";
import "./patientcard.css";
import { getAge } from "../../functions/datefunctions";
import moment from "moment/moment";

const PatientCard = ({ name, birthday, lastcheckup, selected, onClick }) => {
	return (
		<div
			className={
				"patientcard " + (selected ? "patientcard--selected" : "")
			}
			onClick={onClick}
		>
			<div className="patientcard__name">{name || "<EMPTY NAME>"}</div>
			<div className="patientcard__sub-content">
				<div className="patientcard__age">
					<div className="patientcard__label">Age</div>{" "}
					{getAge(birthday)} old
				</div>
				{lastcheckup !== undefined ? (
					<div className="patientcard__last-checkup">
						<div className="patientcard__label">Last Checkup</div>
						{moment(lastcheckup, "MM-DD-YYYY").format(
							"MMMMM DD, YYYY"
						)}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default PatientCard;
