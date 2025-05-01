import React from 'react'
import ItemList from './ItemList'


const Content = ({items, handleCheck, handleDelete}) => {

    return (
        // fragment. The whole component needs to be inside an element (here in App.js)
        <>
            {
                items.length ? (
                    <ItemList
                        items={items}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    ></ItemList>
                ) : (
                    <p style={{marginTop: "2rem"}} > Your list is empty! </p>
                )
            }
        </>
    )
}

export default Content