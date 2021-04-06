import React from "react";
import { Button } from "react-bootstrap";

const FoldersList = (props) => {
    const { data, setSectionChange } = props;
    if (data.length === 0) {
        return (
            <p className="italicize">No folders in this course</p>
        )
    }
    return (<div>
        {data !== null && data !== undefined
            ? <dl> {data.map(section =>
                <>
                    <dt> <Button variant="link" onClick={() => setSectionChange(section._id)}>{section.name}</Button> </dt>
                    <dd> {section.description} </dd>
                </>
            )}</dl> : <p>loading...</p>
        }
    </div>)
}

export default FoldersList;