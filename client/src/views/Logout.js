import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout() {
	sessionStorage.removeItem('token');
	localStorage.removeItem('token');
	localStorage.removeItem('expire');
	return <Redirect to="/login" />
}

export default Logout;
