import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import React from "react";

const RenderSelectField = ({
                               input,
                               label,
                               meta: {touched, error},
                               children,
                               ...custom
                           }) => (
    <FormControl>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: label,
                id: label
            }}
        >
            {children}
        </Select>

    </FormControl>
);

export default RenderSelectField;