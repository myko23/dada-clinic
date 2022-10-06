import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSelectedState,
	setSelectedConsultation,
} from "../../store/reducer/selectedreducer";
import ConsultCard from "../consultcard/consultcard";
import "./consultationslist.css";

const ConsultationsList = ({ data }) => {
	const { consult: selconsult } = useSelector(getSelectedState);
	const dispatch = useDispatch();

	const sortedData = _.reverse(Object.values(data));

	const renderConsult = () => {
		return sortedData.map((item) => {
			return (
				<ConsultCard
					key={item._id}
					id={item._id}
					selected={item._id === selconsult ? true : false}
					chiefcomplaint={item.chiefcomplaint}
					assessment={item.assessment}
					datecreated={item.datecreated}
					onClick={() => {
						setSelectedConsultation(dispatch)(item._id);
					}}
				/>
			);
		});
	};
	return <div className="fit consultationslist">{renderConsult()}</div>;
};

export default ConsultationsList;
