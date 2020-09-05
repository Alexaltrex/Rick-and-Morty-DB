import React from 'react';
import {Button, Typography} from "@material-ui/core";
import {reduxForm, Field, InjectedFormProps} from 'redux-form'
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import RenderTextField from "../../../Common/RenderTextField/RenderTextField";
import {GetStringKeysType} from "../../../../Types/Types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import {
    empty,
    SearchLocationsErrorsType,
    SearchLocationsFormValuesType,
    SearchLocationsValidateType
} from "../../../../Helpers/Validators";
import {SearchLocationsPropsType} from "./SearchLocationsContainer";

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

type PropsType = {
    input: any
    label: string
    meta: { touched: boolean, error: boolean }
    children: any
}

const RenderSelectField: React.FC<PropsType> = (props) => {
    const {input, label, meta: {touched, error}, children, ...custom} = props;
    return (
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
    )
};


//////////////////////////////////////////////////////////////////////////////////
const SearchLocationsForm: React.FC<InjectedFormProps<SearchLocationsFormValuesType, SearchLocationsFormOwnPropsType> & SearchLocationsFormOwnPropsType> = (props) => {
    const classes = useStyles();
    const {handleSubmit, submitting, pristine, reset, error} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='name' component={RenderTextField} label='Name' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='type' component={RenderTextField} label='Type' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='dimension' component={RenderTextField} label='Dimension' variant="outlined" size='small'
                       className={classes.field}/>
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
const validate: SearchLocationsValidateType = (values) => {
    let errors = {} as SearchLocationsErrorsType;
    if (empty(values.name) && (values.name !== '')) {
        errors.name = 'name field is empty'
    }
    if (empty(values.type) && values.type !== '') {
        errors.type = 'type field is empty'
    }
    if (empty(values.dimension) && (values.dimension !== '')) {
        errors.dimension = 'dimension field is empty'
    }
    if (
        (!values.name || empty(values.name))
        && (!values.type || empty(values.type))
        && (!values.dimension || empty(values.dimension))
    ) {
        errors._error = 'At least one member must be entered';
    }
    return errors;
}

////////////////////////////////////////////////////////////////////////////////////////////
const ReduxSearchLocationsForm = reduxForm<SearchLocationsFormValuesType, SearchLocationsFormOwnPropsType>({
    form: 'searchLocations',
    validate
})(SearchLocationsForm);

const SearchLocations: React.FC<SearchLocationsPropsType> = (props) => {
    const {setSearchingParams, setShowLocationsFrom} = props;

    const onSubmit = (formValue: SearchLocationsFormValuesType) => {
        setSearchingParams(formValue)
        setShowLocationsFrom('search')
    };
    return (
        <ReduxSearchLocationsForm onSubmit={onSubmit}/>
    )
};

export default SearchLocations;

///////////////////////////////////////////////////////////////////////////////////////////
type SearchLocationsFormKeysType = GetStringKeysType<SearchLocationsFormValuesType>;
type SearchLocationsFormOwnPropsType = {}


