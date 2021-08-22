import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "../../styles/SearchResults.css";

const SearchResults = ({ results, handleSearchSelection, show }) => {
  console.log(results);
  // results in the form of an object: {files: Array, videos: Array, sections: Array}

  const handleClick = (id) => {
    if (!show) {
      // console.log("yeah")
      console.log(id);
      // handleSearchSelection(id);
    }
  };

  return (
    <div className={"search-results " + (!show && "display-none")}>
      <Card>
        <ListGroup>
          {Object.keys(results).length > 0 ? (
            <div>
              <ListGroup.Item variant="dark" className="my-auto">
                Files
              </ListGroup.Item>
              {results.files.map((data, index) => (
                <ListGroup.Item
                  action
                  key={data.item._id}
                  onMouseDown={handleClick(data.item.title)}
                >
                  {data.item.title}
                </ListGroup.Item>
              ))}
            </div>
          ) : (
            <ListGroup.Item>no matches</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default SearchResults;
