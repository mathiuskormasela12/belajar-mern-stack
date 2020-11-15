import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Logout from './views/Logout';

function Router() {
	return(
		<BrowserRouter>
			<Route path="/" exact component={ Home } />
			<Route path="/register" component={ Register } />
			<Route path="/login" component={ Login } />
			<Route path="/logout" component={ Logout } />
		</BrowserRouter>
	);
}

export default Router;
