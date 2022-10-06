import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCurrentUser,
	getCurrentUserState,
} from "../../store/reducer/currentuser";
import { setLogin } from "../../store/reducer/routereducer";
import "./userselect.css";

const UserSelect = () => {
	const [prompt, setPrompt] = useState(false);
	const dispatch = useDispatch();
	const { name } = useSelector(getCurrentUserState);

	return (
		<div className="userselect">
			<div
				className="userselect__user-container"
				onMouseEnter={() => setPrompt(true)}
				onMouseLeave={() => setPrompt(false)}
			>
				<FontAwesomeIcon
					icon={faCircleUser}
					className="userselect__user-icon"
				/>
				<div className="userselect__user-name">
					{name || "Default User"}
				</div>
			</div>
			{prompt === true ? (
				<div
					className="userselect__prompt"
					onMouseEnter={() => setPrompt(true)}
					onMouseLeave={() => setPrompt(false)}
				>
					<div className="userselect__option">User Settings</div>
					<div
						className="userselect__option"
						onClick={() => {
							clearCurrentUser(dispatch);
							setLogin(dispatch)(false);
						}}
					>
						Logout
					</div>
				</div>
			) : null}
		</div>
	);
};

export default UserSelect;
