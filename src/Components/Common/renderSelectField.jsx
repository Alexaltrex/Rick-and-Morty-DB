import FormControl from "@material-ui/core/FormControl";
import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";



const renderSelectField = ({
                               input,
                               label,
                               meta: {touched, error},
                               children,
                               ...custom
                           }) => {
    return (

        <FormControl error={touched && error}>
            <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
            <Select

                native
                {...input}
                {...custom}
                inputProps={{
                    name: input.name,
                    id: 'color-native-simple'
                }}
            >
                {children}
            </Select>

        </FormControl>
    )
};

export default renderSelectField;