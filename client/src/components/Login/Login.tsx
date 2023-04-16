import React, { useState } from 'react';
import { loginHandler } from '../../api/apiCalls';
import { useAppDispatch } from '../../app/hooks';
import { userLogin } from '../../features/gameState/gameStateSlice';
import './Login.css';
function Login() {
	const [username, setUsername] = useState('');
	const [secret, setSecret] = useState('');
	const dispatch = useAppDispatch();
	const handleUsernameChange = (event: any) => {
		setUsername(event.target.value);
	};
	const handleSecretChange = (event: any) => {
		setSecret(event.target.value);
	};
	const handleLogin = async () => {
		if (username.length === 0 || secret.length === 0) {
			alert('Please enter a value');
			return;
		}
		const regex = /\s+/g;
		if (username.match(regex) || secret.match(regex)) {
			alert('No spaces allowed');
			return;
		}
		const response = await loginHandler(username, secret);
		const data = {
			entityId: response.entityId,
			numberOfWins: response.numberOfWins
		};
		console.log(data);

		dispatch(userLogin(data));
	};
	return (
		<div className="login-overlay">
			<div className="login-box">
				<h2>Enter to play the game</h2>
				<label>
					Username:
					<input
						placeholder="Choose a username. No spaces allowed!"
						value={username}
						type="text"
						onChange={handleUsernameChange}
					/>
				</label>
				<label>
					Secret Key:
					<input
						placeholder="Chose a Secret"
						value={secret}
						type="password"
						onChange={handleSecretChange}
					/>
				</label>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
}

export default Login;
