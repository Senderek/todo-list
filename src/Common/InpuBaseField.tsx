import React, { useCallback, ChangeEvent } from "react";
import { useField } from "react-final-form";
import MuiInputBase, { InputBaseProps } from "@material-ui/core/InputBase";

interface InputBaseFieldProps extends InputBaseProps {
    name: string;
}

const InpuBaseField = (props: InputBaseFieldProps) => {
    const fieldProps = useField(props.name);

    const onInputChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            fieldProps.input.onChange(event.target.value);
        },
        [fieldProps.input]
    );
    return (
        <MuiInputBase
            id="inputToFocus"
            {...fieldProps.input}
            onChange={onInputChange}
            className={props.className}
            placeholder={props.placeholder}
            inputProps={props.inputProps}
            autoFocus={props.autoFocus}
        />
    );
};

export default InpuBaseField;
