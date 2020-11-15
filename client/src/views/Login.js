import React from 'react';
import AuthContext from '../AuthContext';
import FormLogin from '../components/FormLogin';

const { LoginProvider } = AuthContext;

function Login() {
	return(
		<LoginProvider>
			<h1>Login</h1>
			<FormLogin />
		</LoginProvider>
	);
} 

export default Login;
