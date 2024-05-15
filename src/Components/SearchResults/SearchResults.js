import React from "react";
import Tracklist from '../Tracklist/Tracklist'
function SearchResults(props) {
    return(
        <div className="SearchResults">
            <Tracklist userSearchResults={props.userSearchResults}/>
        </div>
    );
}


export default SearchResults