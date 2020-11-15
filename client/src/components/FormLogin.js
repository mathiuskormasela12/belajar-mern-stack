import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import http from '../http';
import styled from './formLogin.module.scss';

const { LoginContext } = AuthContext;

function FormLogin() {
	
	const [loginState, setLoginState] = useState({
		type: false,
		message: false,
		remember: false,
	});

	const {
		state: {
			username,
			password
		},
		setState
	} = useContext(LoginContext);

	function handleInput(field, e) {
		setState(current => ({
			username,
			password,
			[field]: e.target.value
		}));
	}
	
	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		try {
			const result = await http('post', formData, '/login', '');
				console.log(username + ' - ' + password)
			if(loginState.remember) { 
				sessionStorage.setItem('token', result.token);
				localStorage.setItem('token', result.token);
				localStorage.setItem('expire', Math.floor(Date.now() / 1000) + (60 * 5))
			} else 
					sessionStorage.setItem('token', result.token);
			
			setLoginState({
				...loginState,
				type: result.type,
				message: result.message
			})
		} catch(err) {
				setLoginState({
					...loginState,
					type: err.type,
					message: err.message
				});
		}
	}

	return(
		<form method="POST" className={styled.form} onSubmit={ handleSubmit }>
			{loginState.message && loginState.type ? (
				<p className={ styled[loginState.type] }>{ loginState.message }</p>
			) : null}
			<ul>
				<li>
					<label htmlFor="username">Username</label>
				</li>
				<li>
					<input type="text" placeholder="Username" id="username" value={ username } onChange={ e => handleInput('username', e) }/>
				</li>
				<li>
					<label htmlFor="password">Password</label>
				</li>
				<li>
					<input type="password" placeholder="Password" id="password" value={ password} onChange={ e => handleInput('password', e) }/>
				</li>
				<li>
					<label htmlFor="remember">
						<input type="checkbox" value={ loginState.remember } onChange={ () => setLoginState(c => ({...c, remember:!c.remember}))} />
						Ingat Saya
					</label>
				</li>
				<li>
					<button type="submit">Masuk</button>
				</li>
			</ul>
		</form>
	);
}

export default FormLogin;
