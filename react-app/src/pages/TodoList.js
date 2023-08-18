
import React, { useState, useEffect } from 'react';

export default function TodoList() {

    const [todo, setTodo] = useState({ text: '' });
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-final-project/us-central1/addTodo`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo })
            })

            await res.json();
            getTodos();
        }
        catch (e) {
            console.error(e);
        }
    }

    const getTodos = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-final-project/us-central1/getTodos`);
            const data = await res.json();
            setTodos(data.data || []);
        }   
        catch (e) {
            console.error(e);
        }
    }

    return (    
        <div>
            <h1>Todo List</h1>

            <form>
                <label for="todo">
                    Add todo: &nbsp;
                </label>
                <input id="todo" type="text" value={todo.text} onChange={(e) => setTodo({ text: e.target.value })} />
                <button onClick={addTodo}>Add</button>
            </form>

            {todos.map((todo) => 
                <div>
                    {todo.text}
                </div>
            )}

        </div>
    );
}