import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import AddAdmissions from "../../components/addcomponents/addadmissions/addadmissions";
import AddConsultations from "../../components/addcomponents/addconsultations/addconsultations";
import AddPatients from "../../components/addcomponents/addpatients/addpatients";
import BigModal from "../../components/common/bigmodal/bigmodal";
import ConfirmModal from "../../components/common/confirmmodal/confirmmodal";
import LoginForm from "../../components/loginform/loginform";
import Patients from "../../components/patients/patients";
import TopNav from "../../components/topnav/topnav";
import {
	fetchAdmissionAPI,
	fetchConsultationsAPI,
	fetchPatientsAPI,
} from "../../functions/apifunctions";
import { getCurrentUserState } from "../../store/reducer/currentuser";
import { getRouteState } from "../../store/reducer/routereducer";
import DisplayNav from "../displaynav/displaynav";
import "./mainapp.css";

const MainApp = () => {
	const { patienttab, view, bigmodal, login, confirm } =
		useSelector(getRouteState);
	const { id: userId } = useSelector(getCurrentUserState);

	useQuery(["patients", userId], () => fetchPatientsAPI(userId), {
		enabled: userId !== "",
	});

	useQuery(["consultations"], fetchConsultationsAPI);
	useQuery(["admissions"], fetchAdmissionAPI);

	const renderLogin = () => {
		if (login)
			return (
				<div
					className={
						"fit mainapp" + (patienttab ? " mainapp--toggle" : "")
					}
				>
					<div className="mainapp__topnav">
						<TopNav />
					</div>
					{!patienttab ? (
						<div className="mainapp__sidenav">
							<Patients />
						</div>
					) : null}
					<div className="mainapp__displaynav">
						<DisplayNav view={view} />
					</div>
				</div>
			);
		else return <LoginForm />;
	};
	const renderBigModal = () => {
		let modal = {};
		switch (bigmodal) {
			case "addpatients":
				modal = <AddPatients />;
				break;
			case "addconsultations":
				modal = <AddConsultations />;
				break;
			case "addadmissions":
				modal = <AddAdmissions />;
				break;
			default:
				modal = <AddPatients />;
				break;
		}
		if (bigmodal !== "default") return <BigModal>{modal}</BigModal>;
	};

	const renderConfirmModal = () => {
		if (confirm.confirmmodal) return <ConfirmModal />;
	};

	return (
		<>
			{renderBigModal()}
			{renderLogin()}
			{renderConfirmModal()}
		</>
	);
};

export default MainApp;
