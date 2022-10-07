import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../functions/apifunctions";
import { setCurrentUser } from "../../store/reducer/currentuser";
import { setLogin } from "../../store/reducer/routereducer";
import DefaultButton from "../common/DefaultButton/DefaultButton";
import DefaultInput from "../common/DefaultInput/DefaultInput";
import "./loginform.css";

const LoginForm = () => {
	const loginUser = useLoginMutation();
	const dispatch = useDispatch();

	const [loginauth, setLoginAuth] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		setLoginAuth(0);
		setEmail("mykobacal21@gmail.com");
		setPassword("mykobacal");
	}, []);

	const loginButton = async () => {
		try {
			const newUser = await loginUser.mutateAsync({
				email,
				password,
			});
			const decodedUser = jwtDecode(newUser.data);
			setCurrentUser(dispatch)(decodedUser);
			setLogin(dispatch)(true);
		} catch (err) {
			setLoginAuth(loginauth + 1);
			setPassword("");
			console.log("ERROR", err.response.data);
		}
	};

	return (
		<div className="fit fc loginform">
			<div className="loginform__box">
				<div className="loginform__logo"></div>
				<div className="loginform__header">DADA CLINIC</div>
				<DefaultInput
					className="loginform__input"
					label="Email Address"
					width="80%"
					state={email}
					setState={setEmail}
				/>
				<DefaultInput
					className="loginform__input"
					label="Password"
					width="80%"
					state={password}
					setState={setPassword}
					type="password"
					onEnterPress={loginButton}
				/>
				{loginauth !== 0 ? (
					<div className="loginform__error">
						Invalid Username or Password
					</div>
				) : null}
				<DefaultButton
					className="loginform__submit"
					width="80%"
					label="Login"
					onClick={loginButton}
				/>
			</div>
		</div>
	);
};

export default LoginForm;
