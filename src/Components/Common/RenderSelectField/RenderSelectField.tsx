import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import React from "react";

const RenderSelectField: React.FC<PropsType> = (props) => {
    const {input, label, meta: {touched, error}, children, ...custom} = props;
    return (
        <FormControl error={touched && error}>
            <InputLabel htmlFor='color-native-simple'>{label}</InputLabel>
            <Select
                native
                {...input}
                {...custom}
                inputProps={{
                    name: input.name,
                    //id: 'color-native-simple'
                }}
            >
                {children}
            </Select>
        </FormControl>
    )
};

export default RenderSelectField;

//================== TYPES ===================
type PropsType = {
    input: any
    label: string
    meta: { touched: boolean, error: boolean }
    children: any
}