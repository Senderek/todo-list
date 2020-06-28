import React, { Fragment, useState, useEffect, useRef, useCallback } from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Form } from "react-final-form";
import ToDoInput from "./ToDoInput";
import TodoItem, { todoItemeEquals } from "../Interfaces/TodoItem";
import moment from "moment";
import TickIcon from "@material-ui/icons/Check";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { isNullOrWhitespace } from "../Common/helpers";
import axios from "axios";

const intialForm = {};
const initialItems: TodoItem[] = [];

const TodoList = (props: any) => {
    const [listItems, setStateItems] = useState(initialItems);
    const [init, setInit] = useState(intialForm);
    let location = useLocation();
    const { id } = useParams();

    const escFunction = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                setInit(intialForm);
            }
        },
        [setInit]
    );

    useEffect(() => {
        axios.get(`https://localhost:3005/todolist/${id}`).then(x => {
            const newState: TodoItem[] = x.data;
            setStateItems(newState);
        });
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [location, escFunction, id]);

    const onChange = (value: TodoItem[]) => {
        axios.post(`https://localhost:3005/todolist/${id}`, value).then(() => {
            setStateItems(value);
        });
    };

    const onSubmitNew = (values: any, form: any) => {
        if (isNullOrWhitespace(values.mainInput)) return;
        let itemsAfterSubmit: TodoItem[] = [];
        if (values.id != null) {
            const itemToEditIndex: number = listItems.findIndex(x => x.id === values.id);
            const item = { ...listItems[itemToEditIndex] };
            item.text = values.mainInput;
            itemsAfterSubmit = [...listItems.filter(x => x.id !== values.id), item].sort(todoItemeEquals);
        } else {
            const newItem: TodoItem = { id: uuidv4(), addedOnDate: moment(), completionDate: null, text: values.mainInput };
            itemsAfterSubmit = [...listItems, newItem].sort(todoItemeEquals);
        }
        setInit(intialForm);
        onChange(itemsAfterSubmit);
        setTimeout(() => {
            form.resetFieldState("mainInput");
            form.reset();
        });
    };

    const onDelete = (targetIndex: number) => {
        onChange(listItems.filter((x, index) => targetIndex !== index));
    };

    const markAsCompleted = (targetIndex: number) => {
        onChange(
            listItems
                .map((x, index) => (targetIndex === index ? { ...x, completionDate: x.completionDate == null ? moment() : null } : x))
                .sort(todoItemeEquals)
        );
    };

    const onEdit = (index: number) => {
        const item = listItems[index];
        if (item != null) {
            setInit({ id: item.id, mainInput: item.text });
            const elementToFocus = document.getElementById("inputToFocus");
            elementToFocus?.focus();
        }
    };

    const renderList = listItems.map((x: TodoItem, index: number) => {
        const isCompleted = x.completionDate != null;
        return (
            <ListItem key={x.id}>
                <ListItemAvatar>
                    <Avatar
                        onClick={() => {
                            markAsCompleted(index);
                        }}
                    >
                        {isCompleted ? <TickIcon /> : <Fragment />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={x.text} />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => {
                            onEdit(index);
                        }}
                        edge="end"
                        aria-label="delete"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            onDelete(index);
                        }}
                        edge="end"
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    return (
        <Container>
            <Form onSubmit={onSubmitNew} component={ToDoInput} initialValues={init} />
            <List>{renderList}</List>
        </Container>
    );
};

export default TodoList;
