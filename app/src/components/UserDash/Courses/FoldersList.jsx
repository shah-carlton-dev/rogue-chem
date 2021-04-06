import React from "react";

const FoldersList = (props) => {
    const { data } = props;
    console.log(data);
    return (<div>
        {data !== null && data !== undefined
            ? <dl> {data.sections.map(section =>
                    <>
                        <dt>{section.name}</dt>
                        <dd>{section.description}</dd>
                    </>
                )}</dl> : <p>something bad</p>
        }
    </div>)
}

export default FoldersList;