import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoList from "./TodoList/ToDoListComponent";

function App() {
    return (
        <Router>
            <Route path="/">
                <TodoList />
            </Route>
        </Router>
    );
}

export default App;
