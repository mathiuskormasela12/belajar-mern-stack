import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../http';
import SiswaContext from '../SiswaContext';
import styled from './table.module.scss';

const { ShowDataContext } = SiswaContext;

function Table() {

	const { state: data, setState: setData } = useContext(ShowDataContext);
	const [isLoading, setLoading] = useState(false);

	console.log('render')
	useEffect(() => {
		async function handleHttp() {
			try {
				const results = await http('get', null, '/siswa', sessionStorage.getItem('token'));
				setLoading(true);
				setData(() => ({
					...data,
					message: results.message,
					results: results.results	
				}))
			} catch(err) {
					setLoading(true);
					setData(() => ({
						...data,
						message: err.message,
						type: err.type
					}))
			}
		}
		handleHttp();
		// eslint-disable-next-line
	}, []);

	return(
		<div className={ styled.table }>
			{ (data.message.length > 0) ? (
					<p>{ data.message}</p>
			) : null}
			{ (!isLoading) ? (
				<p>Loading</p>
			):null }
			<table>
				<thead>
					<tr>
						<th>No.</th>
						<th>Nama</th>
						<th>NISN</th>
						<th>Kelas/Jurusan</th>
						<th>Foto</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{ data.results.map((item, index) => (
						<tr key={ index }>
							<td>{ index + 1 }</td>
							<td>{ item.nama }</td>
							<td>{ item.nisn }</td>
							<td>{ item.kelas.toUpperCase() } - { item.jurusan.toUpperCase() }</td>
							<td>
								<img alt="Product" src={ item.foto } width="100" height="100"/>
							</td>
							<td>
							<Link to="/edit/{ item.id }">Edit</Link>
								<Link to="/hapus">Hapus</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
