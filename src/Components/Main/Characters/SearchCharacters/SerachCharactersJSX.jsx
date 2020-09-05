import React from 'react';
import {Button, FormHelperText, Typography} from "@material-ui/core";
import {reduxForm, Field} from 'redux-form'
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import RenderTextField from "../../../Common/RenderTextField/RenderTextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

import {
    empty,
} from "../../../../Helpers/Validators";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
    field: {
        marginRight: 10,
        marginBottom: 10,
    },
    button: {
        textTransform: 'none',
        marginRight: 10
    }
});


const renderSelectField = (props) => {
    const {input, label, meta: { touched, error }, children, ...custom} = props;
    return (
        <FormControl error={touched && error}>
            <InputLabel htmlFor='label'>{label}</InputLabel>
            <Select
                native
                {...input}
                {...custom}
                inputProps={{
                    name: input.name,
                    id: 'label'
                }}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    )
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

//////////////////////////////////////////////////////////////////////////////////
const SearchCharactersForm = (props) => {
    const classes = useStyles();
    const {handleSubmit, submitting, pristine, reset, error} = props;
    return (
        <form onSubmit={handleSubmit}>
            SearchCharactersJSX
            <div>
                <Field
                    //classes={classes}
                    name="favoriteColor"
                    component={renderSelectField}
                    label="Color"
                >
                    <option value="" />
                    <option value={'ff0000'}>Red</option>
                    <option value={'00ff00'}>Green</option>
                    <option value={'0000ff'}>Blue</option>
                </Field>
            </div>
            <div>
                <Field name='name' component={RenderTextField} label='Name' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='species' component={RenderTextField} label='Species' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='type' component={RenderTextField} label='Type' variant="outlined" size='small'/>
            </div>
            <div>
                <Field name='status' className={classes.field} component={renderSelectField} label='Status'>
                    <option value=''></option>
                    <option value={'alive'}>Alive</option>
                    <option value={'dead'}>Dead</option>
                    <option value={'unknown'}>Unknown</option>
                </Field>
                <Field name='gender' component={renderSelectField} label='Gender'>
                    <option value=''></option>
                    <option value={'female'}>Female</option>
                    <option value={'male'}>Male</option>
                    <option value={'genderless'}>Genderless</option>
                    <option value={'unknown'}>Unknown</option>
                </Field>
            </div>
            <Button type="submit"
                    variant="contained"
                    startIcon={<SearchIcon/>}
                    disabled={submitting || pristine}
                    className={`${classes.field} ${classes.button}`}>
                Search
            </Button>
            <Button type="button"
                    variant="contained"
                    disabled={pristine || submitting}
                    onClick={reset}
                    className={`${classes.field} ${classes.button}`}>
                Clear Values
            </Button>
            {error && !pristine &&
            <Typography color='error' variant='h6'>
                {error}
            </Typography>}
        </form>
    )
};

///////////////////////////////////////////////////////////////////////////////////////////////////
const validate = (values) => {
    let errors = {};
    if (empty(values.name) && (values.name !== '')) {
        errors.name = 'name field is empty'
    }
    if (empty(values.species) && values.species !== '') {
        errors.species = 'species field is empty'
    }
    if (empty(values.type) && (values.type !== '')) {
        errors.type = 'type field is empty'
    }
    if (
        !values.gender
        && !values.status
        && (!values.name || empty(values.name))
        && (!values.species || empty(values.species))
        && (!values.type || empty(values.type))
    ) {
        errors._error = 'At least one member must be entered';
    }
    return errors;
}

////////////////////////////////////////////////////////////////////////////////////////////
const ReduxSearchCharactersForm = reduxForm({
    form: 'searchCharacters',
})(SearchCharactersForm);

const SearchCharactersJSX = (props) => {
    const {setSearchingParams, setCurrentPage, setShowCharactersFrom} = props;

    const onSubmit = (formValue) => {

        console.log(formValue)
        setCurrentPage(1)
        setSearchingParams(formValue)
        setShowCharactersFrom('search')

    };
    return (
        <ReduxSearchCharactersForm onSubmit={onSubmit}/>
    )
};

export default SearchCharactersJSX;



