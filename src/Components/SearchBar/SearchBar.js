import React from 'react';

function SearchBar() {
    return(
        <div className='SearchBar'>
            <input placeholder='Enter a Song, Album or Artist'/>
            <button className='SearchButton'>
                Search
            </button>
        </div>
    )
}

export default SearchBar