const Database = require('../core/Database');

class SiswaModel extends Database {

	add(nama, kelas, jurusan, nisn, foto, send) {
		this.db.query('SELECT * FROM siswa WHERE nisn = ?', [nisn], (err, results) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error');
			} else if(results.length > 0)
					send(200, 'false', 'warning', 'Siswa sudah ada');
			else {
				this.db.query('INSERT INTO siswa SET ?', { nama, kelas, jurusan, nisn, foto}, err => {
					if(err) {
						console.log(err);
						send(500, 'true', 'danger', 'Server Error');
					} else
							send(200, 'false', 'success', 'Siswa berhasil di tambahkan')
				})
			}
		});
	}

	remove(id, send) {
		this.db.query('SELECT * FROM siswa WHERE id = ?', [id], (err, result) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error', null);
			} else if(result.length < 1) 
					send(200, 'false', 'warning', 'Data tidak ada', null);
			else {
				this.db.query('DELETE FROM siswa WHERE id = ?', [id], err => {
					if(err) {
						console.log(err);
						send(500, 'true', 'danger', 'Server Error', null)
					} else
							send(200, 'false', 'success', 'Berhasil dihapus', result[0].foto)
				});
			}
		});
	}

	getPhotoById(id, send) {
		this.db.query('SELECT foto FROM siswa WHERE id = ?', [id], (err, result) => {
			if(err)
				console.log(err)
			else
				send(result[0].foto);
		})
	}

	edit(id, nama, nisn, kelas, jurusan, foto, send) {
		this.db.query('UPDATE siswa SET ? WHERE id = ?',[{ nama, nisn, kelas, jurusan, foto}, id], err => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error');
			} else
					send(200, 'false', 'success', 'Berhasil di ubah')
		})
	}

	getAllSiswa(send) {
		this.db.query('SELECT * FROM siswa ORDER BY nama ASC', (err, results) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'server error', []);
			} else {
					results = results.map(item => {
						return {
							id: item.id,
							nama: item.nama,
							kelas: item.kelas,
							jurusan: item.jurusan,
							nisn: item.nisn,
							foto: `${process.env.LINKPHOTO}/${item.foto}`
						}
					});
					send(200, 'false', 'success', `Berhasil mengambil ${results.length} data`, results);
			}
		});
	}

	getSiswaById(id, send) {
		this.db.query('SELECT * FROM siswa WHERE id = ?', [id], (err, result) => {
			if(err) {
				console.log(err);
				send(500, 'true', 'danger', 'Server Error', null);
			} else  
					send(200, 'false', 'success', 'Berhasil mengambil data', result[0]);
		});
	}
}

module.exports = new SiswaModel();
