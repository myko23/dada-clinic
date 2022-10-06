import React from "react";
import { formatFormalDate, getDateDiff } from "../../functions/datefunctions";
import "./admitcard.css";

const AdmitCard = ({ selected, onClick, diagnosis, datestart, dateend }) => {
	return (
		<div
			className={"admitcard " + (selected ? "admitcard--selected" : "")}
			onClick={onClick}
		>
			<div className="admitcard__diagnosis">
				{diagnosis || "Diagnosis"}
			</div>
			<div className="admitcard__subcontent">
				<div className="admitcard__DateStart">
					{datestart ? formatFormalDate(datestart) : "Date Start"}
				</div>

				{dateend && dateend !== "NA" ? (
					<div className="admitcard__DateEnd">
						to {formatFormalDate(dateend)}
					</div>
				) : null}
			</div>

			<div className="admitcard__duration">
				{dateend && dateend !== "NA" ? (
					<>
						<span style={{ fontWeight: "1000" }}>Duration:</span>{" "}
						{getDateDiff(datestart, dateend)}
					</>
				) : (
					"Not Yet Discharged"
				)}
			</div>
		</div>
	);
};

export default AdmitCard;
