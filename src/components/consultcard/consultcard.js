import React from "react";
import "./consultcard.css";
import moment from "moment/moment";

const ConsultCard = ({
	chiefcomplaint,
	assessment,
	selected,
	datecreated,
	onClick,
}) => {
	return (
		<div
			className={
				"consultcard " + (selected ? "consultcard--selected" : "")
			}
			onClick={onClick}
		>
			<div className="consultcard__topcontent">
				<div className="consultcard__chiefcomplaint">
					{chiefcomplaint}
				</div>
				<div className="consultcard__date">
					{moment(datecreated, "MM-DD-YYYY").fromNow()}
				</div>
			</div>

			<div className="consultcard__assessment">{assessment}</div>
		</div>
	);
};

export default ConsultCard;
