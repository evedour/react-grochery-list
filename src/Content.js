import React from 'react'
import { useState } from 'react';
import {FaTrashAlt} from 'react-icons/fa'

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: '1 avocado'
        },
        {
            id: 2,
            checked: false,
            item: '2 eggs'
        },
        {
            id: 3,
            checked: false,
            item: '1 loaf of bread'
        },
        {
            id: 4,
            checked: false,
            item: '1 bottle of milk'
        },
        {
            id: 5,
            checked: false,
            item: '1 bottle of water'
        }
    ])

    const handleCheck = (id) => {
        const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked} : item)
        setItems(listItems);
        localStorage.setItem("shoppingList", JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => { return item.id !== id});
        setItems(listItems);
        localStorage.setItem("shoppingList", JSON.stringify(listItems));
    }

    return (
        <main>
            {items.length
                ? (<ul>
                    {items.map((item) => (
                        <li className='item' key={item.id}>
                            <input
                                type='checkbox'
                                checked={item.checked}
                                onChange={() => handleCheck(item.id)}>
                            </input>
                            <label 
                                style={(item.checked) ? {textDecoration: 'line-through'} : null}
                                onDoubleClick={() => handleCheck(item.id)}
                            >
                                {item.item}
                            </label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0">
                            </FaTrashAlt>
                        </li>
                    ))}
            </ul>)
            : (<p style={{marginTop: "2rem"}}>
                Your list is empty!
                </p>)
            }
        </main>
    )
}

export default Content