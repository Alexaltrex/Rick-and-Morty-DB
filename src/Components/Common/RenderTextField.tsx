import {TextField} from "@material-ui/core";
import React from "react";

const RenderTextField: React.FC<PropsType> = (props) => {
    const { label, input, meta: {touched, invalid, error}, ...custom} = props;

    return (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}/>
        );
};

export default RenderTextField;

//================== TYPES ====================
type PropsType = {
    label: string
    input: any
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }

}