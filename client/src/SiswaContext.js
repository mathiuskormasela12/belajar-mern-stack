import React, { useState, createContext } from 'react';

function SiswaContext() {

	const ShowDataContext = createContext();

	const ShowDataProvider = props => {
		const [state, setState] = useState({
			message: '',
			type: '',
			results: []
		});
		const data = { state, setState };

		return(
			<ShowDataContext.Provider value={ data }>
				{ props.children }
			</ShowDataContext.Provider>
		);
	}

	return {
		ShowDataContext,
		ShowDataProvider
	}

}

export default SiswaContext();
