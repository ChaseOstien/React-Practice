import { useEffect, useState } from "react"
import ListItem from "./ListItem";
import PackingList from "./PackingList";

export default function Form() {
    const [formData, setFormData] = useState(() => {
        const storage = localStorage.getItem('ITEMS');
        if (storage === null) return [];

        return JSON.parse(storage);
    });
    const [newSubmission, setNewSubmission] = useState('');

    useEffect(() => {
        localStorage.setItem('ITEMS', JSON.stringify(formData))
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(newSubmission);

        setFormData(currentFormData => {
            return [
            ...currentFormData, { id: crypto.randomUUID(), newSubmission, completed: false },]
        }); 


        console.log(formData);

        setNewSubmission('');
    }

    function toggleTodo(completed, id) {
        setFormData(currentFormData => {
            return currentFormData.map(data => {
                if (data.id === id) {
                    return { ...data, completed }
                }
                return data
            });
        });
    }

    const deleteTodo = (id) => {
        setFormData(currentFormData => {
            return currentFormData.filter(currentData => currentData.id !== id)
        });
    }

    return (
        <>
        <div className="container">
        <h1>ToDo List</h1>
      <form  className="form" onSubmit={handleSubmit}> 
        <label className="label">Todo:
          <input className="input"  type="text" value={newSubmission} onChange={e => setNewSubmission(e.target.value)} placeholder="Write a Todo"></input>
        </label>
        <button type="submit" className="button">Add to List!</button>
      </form>
    
    <div className="submissions">
    <ul className="list">
        {formData.length === 0 && 'No Todos!'}
        {formData.map(data => {
            return <ListItem data={data} key={data.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} id={data.id}/>
        })}
    </ul>
    </div>
    </div>
    <PackingList />
    </>
    )
}
