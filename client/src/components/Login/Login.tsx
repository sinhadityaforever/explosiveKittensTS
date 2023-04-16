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
		const response = await loginHandler(username, secret);
		dispatch(userLogin(response.numberOfWins));
	};
	return (
		<div className="login-overlay">
			<div className="login-box">
				<h2>Login to play the game</h2>
				<label>
					Username:
					<input value={username} type="text" onChange={handleUsernameChange} />
				</label>
				<label>
					Secret Key:
					<input value={secret} type="password" onChange={handleSecretChange} />
				</label>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
}

export default Login;
