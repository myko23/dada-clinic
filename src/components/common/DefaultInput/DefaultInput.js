import React from "react";
import "./DefaultInput.css";

const DefaultInput = ({
	label,
	state,
	setState,
	className,
	width,
	edit,
	type,
	onEnterPress,
}) => {
	const defineEdit = () => {
		if (edit === true) return "defaultinput__edit--true";
		else if (edit === false) return "defaultinput__edit--false";
		else return "defaultinput__edit--true";
	};
	return (
		<div
			className={`defaultinput ${className || ""} ${defineEdit()}`}
			style={{ width: width || "50rem" }}
		>
			<div className="defaultinput__label">{label || "label"}</div>
			<input
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						if (onEnterPress) onEnterPress();
					}
				}}
				type={type || "text"}
				className="defaultinput__input"
				value={state}
				onChange={(e) => {
					if (setState) setState(e.target.value);
				}}
			/>
		</div>
	);
};

export default DefaultInput;
