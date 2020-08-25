import React from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {reduxForm, Field} from 'redux-form'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

///////////////////////////////////////////////////////////////
const RenderTextField = ({
                             label,
                             input,
                             meta: {touched, invalid, error},
                             ...custom
                         }) => (

    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />


);

/////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////////////
const SearchCharactersForm = (props) => {
    const classes = useStyles();
    const {handleSubmit, submitting, pristine, reset, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='name' component={RenderTextField} label='Name' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='species' component={RenderTextField} label='Species' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='type' component={RenderTextField} label='Type' variant="outlined" size='small'/>
            </div>
            <div>
                <Field name='status' className={classes.field} component={RenderSelectField} label='Status'>
                    <option value={''}></option>
                    <option value={'alive'}>Alive</option>
                    <option value={'dead'}>Dead</option>
                    <option value={'unknown'}>Unknown</option>
                </Field>
                <Field name='gender' component={RenderSelectField} label='Gender'>
                    <option value={''}></option>
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
    const empty = (str) => /^\s+$/.test(str)
    let errors = {};
    if (empty(values.name) && values.name !== '') {
        errors.name = 'name field is empty'
    }
    if (empty(values.species) && values.species !== '') {
        errors.species = 'species field is empty'
    }
    if (empty(values.type) && values.type !== '') {
        errors.type = 'type field is empty'
    }
    if ((!values.name || empty(values.name)) &&
        !values.gender && !values.gender
        && (!values.species || empty(values.species)) &&
        (!values.type || empty(values.type))) {
        errors._error = 'At least one member must be entered';
    }
    console.log(errors)
    return errors
}

////////////////////////////////////////////////////////////////////////////////////////////
const ReduxSearchCharactersForm = reduxForm({
    form: 'searchCharacters',
    validate
})(SearchCharactersForm);

const SearchEpisodes = (props) => {
    const {setShowCharactersFromSearch, setSearchingParams, setCurrentPage} = props;

    const onSubmit = (formValue) => {
        // if (в форму введены валидные данный) {
        // setSearchingParams(formValue)
        // setShowCharactersFromSearch(true);
        // }

        console.log(formValue)
        setCurrentPage(1)
        setSearchingParams(formValue)
        setShowCharactersFromSearch(true);

    }
    return (
        <ReduxSearchCharactersForm onSubmit={onSubmit}/>
    )
};

export default SearchEpisodes