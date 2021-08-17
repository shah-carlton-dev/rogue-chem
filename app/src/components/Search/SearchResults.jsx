import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const SearchResults = ({ results, handleSearchSelection, setShow }) => {

  const handleClick = (e) => {
    console.log("gfd");
    handleSearchSelection(e);
  };

  return (
    <div className="search-results" >
      <Card>
        <ListGroup>
          {results.length > 0 ? (
            results.map((data, index) => (
                <ListGroup.Item key={data.id}>
                  <div
                    // onClick={console.log("clicked")}
                    path={["add", "path", "here"]}
                  >
                    {data.title}
                  </div>
                </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>no matches</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default SearchResults;
