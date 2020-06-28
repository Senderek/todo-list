import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TodoList from "./TodoList/ToDoListComponent";
import { v4 as uuidv4 } from "uuid";

function App() {
    return (
        <Router>
            <Route exact path="/">
                <Redirect to={`/${uuidv4()}`} />
            </Route>
            <Route path="/:id">
                <TodoList />
            </Route>
        </Router>
    );
}

export default App;
