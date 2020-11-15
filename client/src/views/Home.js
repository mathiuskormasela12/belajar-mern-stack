import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Table from '../components/Table';
import SiswaContext from '../SiswaContext';

const { ShowDataProvider } = SiswaContext;

function Home() {

	if(!sessionStorage.getItem('token') && localStorage.getItem('token')) {
		sessionStorage.setItem('token', localStorage.getItem('token'));
		return <Redirect to="/" />
	} else if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
		return <Redirect to="/login" />
	else if(parseInt(sessionStorage.getItem('expire')) < Math.floor(Date.now() / 1000) && localStorage.getItem('token') != null) {
		console.log(localStorage);
		return <Redirect to="/login" />
	}
	return(
		<ShowDataProvider>
			<h1>Aplikasi Manajemen Siswa</h1>
			<Link to="/">Home</Link>
			<Link to="/logout">Logout</Link>
			<Table />
		</ShowDataProvider>
	);
}

export default Home;
