export default function http(method, body, path, token) {
	return fetch(`http://127.0.0.1:5000/api/v1${path}`, {
						method: method.toUpperCase(),
						body,
						headers: {
							"token": token
						}
					})
					.then(response => {
						if(!response.ok) {
							throw new Error('Client Error')
						}
						return response.json();
					})
					.then(response => { 
						if(response.error === 'true') {
							throw new Error({
								type: response.type,
								message: response.message
							});
						} else {
							return response;
						}
					});
}
