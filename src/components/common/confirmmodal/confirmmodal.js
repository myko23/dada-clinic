import React from "react";
import { useDispatch } from "react-redux";
import { setConfirmModal } from "../../../store/reducer/routereducer";
import DefaultButton from "../DefaultButton/DefaultButton";
import "./confirmmodal.css";

const ConfirmModal = () => {
	const dispatch = useDispatch();
	return (
		<div className="modal confirmmodal">
			<div
				className="modal-overlay confirmmodal__overlay"
				onClick={() => setConfirmModal(dispatch)(false, 0)}
			></div>
			<div className="modal-box confirmmodal__box">
				<div className="confirmmodal__header">Alert</div>
				<div className="confirmmodal__message">
					Are you sure with this operation?
				</div>
				<div className="confirmmodal__button-container">
					<DefaultButton label="Confirm" width="25rem" />
					<DefaultButton label="Cancel" width="25rem" />
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
