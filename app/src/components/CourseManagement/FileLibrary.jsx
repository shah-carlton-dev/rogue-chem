import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const FileLibrary = (props) => {
	const [filesList, setFilesList] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const [refresh, setRefresh] = useState(false);
	const { files, addFile } = props;

	useEffect(() => {
		getFilesList();
	}, []);

	const getFilesList = async () => {
		try {
			const { data } = await axios.get(API_URL + "/getAllFiles");
			setErrorMsg('');
			// setFilesList(data.filter((f) => !files.includes(f)));
			setFilesList(data);
		} catch (error) {
			error.response && setErrorMsg(error.response.data);
		}
	};

	const downloadFile = async (id, path, mimetype) => {
		try {
			const result = await axios.get(API_URL + "/download/" + id, {
				responseType: 'blob'
			});
			const split = path.split('/');
			const filename = split[split.length - 1];
			setErrorMsg('');
			return download(result.data, filename, mimetype);
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrorMsg('Error while downloading file. Try again later');
			}
		}
	};

	const addHandler = (id) => {
		addFile(id);
		setRefresh(!refresh);
	}

	return (
		<div className="files-container">
			{errorMsg && <p className="errorMsg">{errorMsg}</p>}
			<table className="files-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>File type</th>
						<th>Download</th>
						<th>Add</th>
					</tr>
				</thead>
				<tbody>
					{filesList.length > 0 ? (
						filesList.map(
							({ _id, title, description, file_path, file_mimetype }) => (
								<tr key={_id}>
									<td className="file-title">{title}</td>
									<td className="file-description">{description}</td>
									<td className="file-mimetype">{file_mimetype}</td>
									<td>
										<a href="#/" onClick={() => downloadFile(_id, file_path, file_mimetype)}>
											Download
										</a>
									</td>
									<td>
										{
											files.map(f => f._id).includes(_id) ? <></> :
												<a href="#/" onClick={() => addHandler(_id)} > Add</a>
										}

									</td>
								</tr>
							)
						)
					) : (
						<tr className="text-center">
							<td className="italicize" colSpan={5}> No new files found. Add files in the File Management tab.</td>
						</tr>
					)}
				</tbody>
			</table>

		</div>
	);
};

export default FileLibrary;