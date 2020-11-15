// ===== import all modules

// import all models
const UserModel		= require('../models/UserModel');
const SiswaModel	= require('../models/SiswaModel');
const jwt					= require('jsonwebtoken');
const fs					= require('fs');

exports.start = function(req, res) {
	res.status(200).json({
		status: 200,
		error: 'false',
		type: 'success',
		message: 'Welcome to MERN Stack API'
	});
}

exports.middleware = function(req, res, next) {

	const token = req.body.token || req.headers['token'] || req.query.token;

	if(token) {
		jwt.verify(token, process.env.SECRET, (err, decode) => {
			if(err) {
				console.log(err);
				res.status(400).json({
					status: 400,
					error: 'true',
					type: 'warning',
					message: 'token bermasalah'
				});
			} else {
					if(decode.exp < Date.now() / 1000) {
						res.status(400).json({
							status: 400,
							error: 'true',
							type: 'warning',
							message: 'token sudah expired'
						});
					} else {
						req.token = decode;
						next()
					}
			}
		});
	} else {
		res.status(200).json({
			status: 200,
			error: 'true',
			type: 'warning',
			message: 'tidak ada token'
		});
	}

}

exports.register = function(req, res) {
	const {
		username,
		password,
		confirmPassword
	} = req.body;

	if(!username || !password || !confirmPassword) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'form kosong'
		});
	}

	if(password !== confirmPassword) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'password tidak cocok'
		});
	}

	if(password.length < 5) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'password min 5 karakter'
		});
	}

	UserModel.register(username, password, (status, error, type, message) => {
		res.status(status).json({
			status,
			error,
			type,
			message
		});
	});
}

exports.login					= function(req, res) {
	const {
		username,
		password
	} = req.body;

	if(!username || !password) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'form kosong',
			token: 'false'
		});
	}

	UserModel.login(username, password, (status, error, type, message, token) => {
		res.status(status).json({
			status,
			error,
			type,
			message,
			token
		});
	});
}

exports.add = async function(req, res) {
	const {
		nama,
		kelas,
		jurusan,
		nisn
	} = req.body;

	if(!nama || !kelas || !jurusan || !nisn) {
		return res.status(200).json({
							status: 200,
							error: 'false',
							type: 'warning',
							message: 'form kosong'
						});
	}

	if(nisn.length < 5 || nisn.length > 5) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'nisn harus 5 char'
		});
	}

	const photo = await upload(req, res);
	
	SiswaModel.add(nama, kelas, jurusan, nisn, photo.message, (status, error, type, message) => {

		if(type !== 'success' || error === 'true') {
			fs.unlink(`./public/uploads/${photo.message}`, err => {
				if(err)
					console.log(err);
			});
			return;
		}

		res.status(status).json({
			status,
			error,
			type,
			message
		});
	});

}

exports.remove = function(req, res) {
	const id = req.params.id;

	SiswaModel.remove(id, (status, error, type, message, foto) => {
		if(type === 'success') {
			fs.unlink(`./public/uploads/${foto}`, err => {
				if(err) 
					console.log(err);
			})
		}
		res.status(status).json({
			status,
			error,
			type,
			message
		});
	});
}

exports.edit = async function(req, res) {
	const {
		id,
		nama,
		nisn,
		kelas,
		jurusan
	} = req.body;

	if(!id || !nama || !nisn || !kelas || !jurusan) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'form kosong'
		});
	}

	if(nisn.length > 5 || nisn.length < 5) {
		return res.status(200).json({
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'nisn harus 5 char'
		});
	}
	
	SiswaModel.getPhotoById(id, async file => {
		let foto = '';
		if(!req.files) 
			foto = { message: file };
		else {
			foto = await upload(req, res);
			if(foto.type != 'success') {
				return res.status(foto.status).json({
					status: foto.status,
					error: foto.error,
					type: foto.type,
					message: foto.message
				});
			}
		}

		SiswaModel.edit(id, nama, nisn, kelas, jurusan, foto.message, (status, error, type, message) => {
			if(type === 'success' && req.files) {
				fs.unlink(`./public/uploads/${file}`, err => {
					if(err)
						console.log(err);
				})
			}else if(type !== 'success' && req.files) {
				fs.unlink(`./public/uploads/${foto.message}`, err => {
					if(err)
						console.log(err);
				})
			}
			res.status(status).json({ status, error, type, message});
		})
	});

}

exports.getAllSiswa = function(req, res) {
	SiswaModel.getAllSiswa((status, error, type, message, results) => {
		res.status(status).json({
			status,
			error,
			type,
			message,
			results
		})
	});
}

exports.getSiswaById = function(req, res) {
	SiswaModel.getSiswaById(req.params.id, (status, error, type, message, results) => {
		res.status(status).json({
			status,
			error,
			type,
			message,
			results
		})
	});
}

function upload(req, res) {
	if(!req.files) {
		return {
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'Wajib upload foto'
		}
	}

	const photo = req.files.foto;

	// check extension
	const extValid = /jpg|jpeg|png/gi;
	const checkMimeType = extValid.test(photo.mimetype);
	const checkExt			= extValid.test(photo.name);

	if(!checkMimeType && !checkExt) {
		return {
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'file bukan foto'
		}
	}

	if(photo.size > 2000000) {
		return {
			status: 200,
			error: 'false',
			type: 'warning',
			message: 'max foto 2mb'
		}
	}

	let foto = photo.name.split('.')[0];
	const ext = photo.name.split('.')[1].toLowerCase();
	foto += '-';
	foto += Date.now();
	foto += `.${ext}`;
	
	photo.mv('./public/uploads/' + foto);

	return {
		type: 'success',
		message: foto
	}
}
