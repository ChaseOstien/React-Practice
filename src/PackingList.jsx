/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Item from "./Item"
import { useEffect, useState } from "react";


export default function PackingList() {
    const [ packingList, setPackingList ] = useState(() => {
        const localValue = localStorage.getItem('PACKINGLIST')
        if (localValue == null) return [];

        return JSON.parse(localValue);
    });

    const [ newItem, setNewItem ] = useState('');
    // const [ packed, setPacked ] = useState(false);

    useEffect(() => {
        localStorage.setItem('PACKINGLIST', JSON.stringify(packingList))
    }, [packingList]);

    function addItem(title) {
        setPackingList(currentPackingList => {
            return [ ...currentPackingList,
                {id: crypto.randomUUID(), title, completed: false}
            ]
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (newItem === null) return

        addItem(newItem);

        setNewItem('');
    }

    return (
        <>
            <div className="listContainer">
                <h1>Packing List</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>Enter an Item:
                        <input type="text" className="input" value={newItem} onChange={e => setNewItem(e.target.value)}></input>
                        <button type="submit">Submit</button>
                    </label>
                </form>
                <Item packingList={packingList} setPackingList={setPackingList}/>
            </div>
        </>
    )
}
