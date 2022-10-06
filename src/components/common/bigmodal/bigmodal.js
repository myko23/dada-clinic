import React from "react";
import { useDispatch } from "react-redux";
import { setBigModal } from "../../../store/reducer/routereducer";
import "./bigmodal.css";

const BigModal = (props) => {
	const dispatch = useDispatch();
	const { children } = props;
	return (
		<div className="modal bigmodal">
			<div
				className="modal-overlay bigmodal__overlay"
				onClick={() => setBigModal(dispatch)("default")}
			></div>
			<div className="modal-box bigmodal__modal">
				{children || "Empty"}
			</div>
		</div>
	);
};

export default BigModal;
