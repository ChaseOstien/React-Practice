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

    function togglePackingList({id, completed}) {
        setPackingList(currentPackingList => {
            return currentPackingList.map(item => {
              if (item.id === id) {
                return {...item, completed}
              }
              return item;
            });
        })
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
                <ul className="list">
                    {packingList.length === 0 && 'No items to pack!'}
                    {packingList.map(item => {
                        return (
                            <Item {...item} key={item.id} newItem={newItem} packingList={packingList} addItem={addItem} togglePackingList={togglePackingList}/>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
