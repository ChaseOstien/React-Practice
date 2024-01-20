/* eslint-disable react/prop-types */

export default function Item({ completed, packingList, setPackingList }) {

    function togglePackingList( checked, id ) {
        console.log('hello');
        setPackingList(currentPackingList => {
            console.log('hello');
            return currentPackingList.map(item => {
                // console.log('hello again');
              if (item.id === id) {
                console.log(item);
                return {...item, completed: true}
              }
              return item;
            });
        })
    }

    const deletePackingList = (id) => {
        setPackingList(currentPackingList => {
            return currentPackingList.filter(item => item.id !== id);
        });
    }

    return (
        <ul className="list">
            {packingList.length === 0 && 'No items to pack!'}
            {packingList.map(item => {
                return (
                    <li className="listItem" key={item.id}> 
                    <input type='checkbox' name="packed"  checked={item.completed} onChange={(e) => togglePackingList(e.target.checked, item.id, completed)}></input>
                        <p>{item.title}</p>
                    <button disabled={!item.completed} onClick={() => deletePackingList(item.id)}>Delete</button>
                    </li>
                    )
                })}
        </ul>
    )
}
