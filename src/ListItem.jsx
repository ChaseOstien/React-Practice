/* eslint-disable react/prop-types */

export default function ListItem({ data, completed, id, toggleTodo, deleteTodo }) {

    return (
        <>
            <li className="listItem" key={data.id}>
                <label>
                <input type="checkbox" checked={completed} onChange={e => toggleTodo(id, e.target.checked)}></input>
                {data.newSubmission}
                </label>
                <button onClick={() => deleteTodo(id)}>Delete</button>
            </li>
        </>
    )
}