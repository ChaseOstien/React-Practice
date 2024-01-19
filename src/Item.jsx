/* eslint-disable react/prop-types */


export default function Item({ newItem, title, id, completed, packingList, addItem, togglePackingList }) {
    if (completed === true) {
        return null;
    }
    return (
            <li className="listItem"> 
                <input type='checkbox' checked={completed} onChange={e => togglePackingList(e.target.checked)}></input>
                <p>{title}</p>
            </li>
    )
}
