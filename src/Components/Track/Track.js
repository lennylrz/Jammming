import React from "react";
function Track(props) {
    function renderAction() {
        if(props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }
    return(
        <div className='Track'>
            <div className='Track-information'>
                <h3></h3>
                <p></p>
            </div>
            <button class='Track-action'></button>
        </div>
    )
}
export default Track