import React from "react";
import { API_URL } from "../../utils/constants.js";
import Axios from "axios";
import download from 'downloadjs';

const FileList = (props) => {
    const { files } = props;

    const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await Axios.get(API_URL + "/download/" + id, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error while downloading file. Try again later');
            }
        }
    };

    return (<>
        <table className="files-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File type</th>
                    <th>Download</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {files.map(
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
                                <a href="#/" onClick={() => props.removeFile(_id)} >
                                    Remove
										</a>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    </>)
}

export default FileList;