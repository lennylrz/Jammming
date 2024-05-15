import React from "react";
import Track from '../Track/Track'
function Tracklist(props) {
    return(
        <div className="Tracklist">
            {props.userSearchResults.map((track) => {
              return  <Track />
            })}
        </div>
    )
};

export default Tracklist;