import React from 'react';
import AuthContext from '../AuthContext';
import FormRegister from '../components/FormRegister';

function Register() {

	const { RegisterProvider } = AuthContext;

	return(
		<RegisterProvider>
			<FormRegister />
		</RegisterProvider>
	);
} 

export default Register;
