import React, { useEffect, PureComponent, Fragment, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Add";
import AcceptIcon from "@material-ui/icons/AddBox";
import CancelIcon from "@material-ui/icons/Cancel";

import InpuBaseField from "../Common/InpuBaseField";
import { useStyles } from "../Styles/root";
import { useField } from "react-final-form";
import { isNullOrWhitespace } from "../Common/helpers";

const ToDoInput = (props: any) => {
    const initialize = props.form.initialize;

    const onCancel = useCallback(
        event => {
            initialize({});
        },
        [initialize]
    );

    const classes = useStyles();
    const idFormState = useField("id", { subscription: { value: true } });
    const isEdit = !isNullOrWhitespace(idFormState.input.value);

    return (
        <Paper component="form" className={classes.root} onSubmit={props.handleSubmit}>
            <InpuBaseField
                name="mainInput"
                className={classes.input}
                placeholder="Add new to-do"
                inputProps={{ "aria-label": "Add new to-do" }}
                autoFocus={true}
            />
            {isEdit ? (
                <Fragment>
                    <IconButton aria-label="cancel" onClick={onCancel}>
                        <CancelIcon />
                    </IconButton>
                    <IconButton aria-label="confirm" onClick={props.handleSubmit}>
                        <AcceptIcon />
                    </IconButton>
                </Fragment>
            ) : (
                <IconButton aria-label="add" onClick={props.handleSubmit}>
                    <SearchIcon />
                </IconButton>
            )}
        </Paper>
    );
};

export default ToDoInput;
