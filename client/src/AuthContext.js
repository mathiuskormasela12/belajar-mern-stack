import React, { useState, createContext } from 'react';

function AuthContext() {

	const RegisterContext = createContext();
	const LoginContext = createContext();

	const RegisterProvider = props => {

		const [state, setState] = useState({
			username: '',
			password: '',
			confirmPassword: ''
		});

		const registerState = { state, setState };

		return(
			<RegisterContext.Provider value={ registerState }>
				{ props.children }
			</RegisterContext.Provider>
		);
	}

	const LoginProvider = props => {
		const [state, setState] = useState({
			username: '',
			password: ''
		});

		const loginState = { state, setState };

		return(
			<LoginContext.Provider value={ loginState }>
				{ props.children }
			</LoginContext.Provider>
		);
	}

	return {
		RegisterContext,
		LoginContext,
		RegisterProvider,
		LoginProvider
	}

}

export default AuthContext();
