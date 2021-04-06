import React from "react";

const FilePreview = (props) => {
    const { files } = props;
    console.log(files);
    return (
        <dl> {files.map(file =>
            <>
                <dt> {file.title} </dt>
                <dd> <p>{file.keywords.map(k => <>{k},</>)} </p></dd>
            </>
        )}</dl>

    )
}

export default FilePreview;