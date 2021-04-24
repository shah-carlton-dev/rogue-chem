import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const VideoLibrary = (props) => {
    const [videosList, setVideosList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [refresh, setRefresh] = useState(false);
    const { videos, addVideo } = props;

    useEffect(() => {
        getVideosList();
    }, []);

    const getVideosList = async () => {
        try {
            await axios.get(API_URL + "/getAllVideos").then((res) => {
                setVideosList(res.data)
                setErrorMsg('')});
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    const addHandler = (id) => {
        addVideo(id);
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
                        <th>URL</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {videosList.length > 0 ? (
                        videosList.map(
                            ({ _id, url, title, description }) => (
                                <tr key={_id}>
                                    <td className="file-title">{title}</td>
                                    <td className="file-description">{description}</td>
                                    <td className="file-url"><a target="_blank" href={url}>link</a></td>
                                    <td>
                                        {
                                            videos.map(f => f._id).includes(_id) ? <></> :
                                                <a href="#/" onClick={() => addHandler(_id)} > Add</a>
                                        }

                                    </td>
								</tr>
							)
						)
					) : (
                                    <tr className="text-center">
                                        <td className="italicize" colSpan={5}> No new videos found. Add files in the File Management tab.</td>
                                    </tr>
					)}
				</tbody>
			</table>

		</div>
	);
};

export default VideoLibrary;