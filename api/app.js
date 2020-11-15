// ===== import all packages
const express			= require('express');
const dotenv			= require('dotenv');
const cors				= require('cors');

// init dotenv
dotenv.config({ path: './.env'});

// init app & port
const app					= express();
const port				= process.env.PORT || 3000;

// setup urlencode
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup static files
app.use(express.static('./public'));

// setup cors
const whiteList = [
	'http://localhost:3000'
];

const corsOptions = {
	origin: function(origin, callback) {
		if(whiteList.indexOf(origin) !== -1 || !origin)
			callback(null, true);
		else
			callback(new Error(''))
	}
};

app.use(cors(corsOptions));

app.use('/api/v1', require('./app/routes/pages'));

app.listen(port, () => console.log(`magic happen at http://127.0.0.1:${port}/api/v1`));
