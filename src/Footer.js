import React from 'react'

const Footer = ({ count }) => {
    return (
        <footer>
            <p>{count} List {count === 1 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer