import React from 'react'

const Filter = ({searchWord,inputHandleSearch}) => {
    return(
        <div>
        filter shown with: <input value={searchWord} onChange={inputHandleSearch}/>
        </div>
    )
}

export default Filter