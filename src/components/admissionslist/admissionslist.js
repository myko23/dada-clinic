import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSelectedState,
	setSelectedAdmission,
} from "../../store/reducer/selectedreducer";
import AdmitCard from "../admitcard/admitcard";
import "./admissionslist.css";

const AdmissionsList = ({ data }) => {
	const dispatch = useDispatch();

	const { admit: seladmit } = useSelector(getSelectedState);

	const sortedData = _.reverse(Object.values(data));

	const renderAdmit = () => {
		return sortedData.map((item) => {
			return (
				<AdmitCard
					key={item._id}
					id={item._id}
					selected={item._id === seladmit ? true : false}
					diagnosis={item.diagnosis}
					datestart={item.datestart}
					dateend={item.dateend}
					onClick={() => {
						setSelectedAdmission(dispatch)(item._id);
					}}
				/>
			);
		});
	};
	return <div className="fit admissionslist">{renderAdmit()}</div>;
};

export default AdmissionsList;
