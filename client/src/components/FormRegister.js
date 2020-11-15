import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../AuthContext';
import http from '../http';
import styled from './formRegister.module.scss';

function FormRegister() {

	const { RegisterContext } = AuthContext;

	const { state, setState } = useContext(RegisterContext);

	const [message, setMessage] = useState(false);

	function handleInput(field, e) {
		setState({
			...state,
			[field]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', state.username);
		formData.append('password', state.password);
		formData.append('confirmPassword', state.confirmPassword)
		try {
			const result = await http('post', formData, '/register', sessionStorage.getItem('token'));
			setMessage({
				type: result.type,
				message: result.message
			});
			<Redirect to="/login" />
		} catch(err) {
				setMessage({
					type: err.type,
					message: err.message
				});
		}
	}

	return(
		<div className={ styled.register }>
			<h1>Register</h1>
			{message ? (
				<p className={styled[message.type]}>
					{ message.message }
				</p>
			) : null}
			<form method="POST" onSubmit={ handleSubmit }>
				<ul>
					<li>
						<label htmlFor="username">Username</label>
					</li>
					<li>
						<input type="text" id="username" placeholder="Username" value={ state.nama } onChange={ e => handleInput('username', e) }/>
					</li>
					<li>
						<label htmlFor="pw">Password</label>
					</li>
					<li>
						<input type="password" id="pw" placeholder="Password" value={ state.password } onChange={ e => handleInput('password', e) }/>
					</li>
					<li>
						<label htmlFor="pw2">Password Confirm</label>
					</li>
					<li>
						<input type="password" id="pw2" placeholder="Password Confirm" value={ state.confirmPassword } onChange={ e => handleInput('confirmPassword', e)} />
					</li>
					<li>
						<button type="submit">Login</button>
					</li>
				</ul>
			</form>
		</div>
	);
} 

export default FormRegister;
