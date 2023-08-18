import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import TodoList from './pages/TodoList';


export default function App() {

    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo-list" element={<TodoList />} />
            </Routes>
        </BrowserRouter>
    )
}