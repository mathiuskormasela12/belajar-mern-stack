// ===== import all modules
const Database	= require('../core/Database');
const bcrypt		= require('bcryptjs');
const jwt				= require('jsonwebtoken');

class UserModel extends Database {
	
	register(username, password, send) {
		this.db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error');
			}
			else if(result.length > 0) 
				send(200, 'false', 'warning', 'user terlah terdaftar');
			else {
				const hash = await bcrypt.hash(password, 8);
				this.db.query('INSERT INTO users SET ?', { username, password: hash}, err => {
					if(err) {
						console.log(err);
						send(500, 'true', 'danger', 'Server Error');
					}
					else
						send(200, 'false', 'success', 'user baru berhasil ditambahkan');
				});
			}
		});
	}

	login(username, password, send) {
		this.db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error', 'false');
			}
			else if(results < 1 || !(await bcrypt.compare(password, results[0].password))) 
				send(200, 'false', 'warning', 'username atau password salah', 'false');
			else {
				const token = jwt.sign({ id: results[0].id, username }, process.env.SECRET, {
					expiresIn: '1h'
				});
				send(200, 'false', 'success', 'berhasil login', token);
			}
		});
	}

}

module.exports = new UserModel;
