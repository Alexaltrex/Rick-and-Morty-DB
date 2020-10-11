import React from 'react';
import {Button, Typography} from "@material-ui/core";
import {reduxForm, Field, InjectedFormProps} from 'redux-form'
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import {SearchCharactersPropsType} from "./SearchCharactersContainer";
import {
    empty,
    SearchCharactersErrorsType,
    SearchCharactersFormValuesType,
    SearchCharactersValidateType
} from "../../../../Helpers/Validators";
import renderSelectField from "../../../Common/renderSelectField";
import RenderTextField from "../../../Common/RenderTextField";

//================================= FORM ===================================
const SearchCharactersForm: React.FC<InjectedFormProps<SearchCharactersFormValuesType, SearchCharactersFormOwnPropsType> & SearchCharactersFormOwnPropsType> = (props) => {
    const classes = useStyles();
    const {handleSubmit, submitting, pristine, reset, error} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='name' component={RenderTextField} label='Name' variant="outlined" size='small'
                       className={classes.textField}/>
                <Field name='species' component={RenderTextField} label='Species' variant="outlined" size='small'
                       className={classes.textField}/>
                <Field name='type' component={RenderTextField} label='Type' variant="outlined" size='small'
                       className={classes.textField}/>
            </div>

            <div>
                <Field name='status' component={renderSelectField} label='Status' className={classes.selectField}>
                    <option value={''}/>
                    <option value={'alive'}>Alive</option>
                    <option value={'dead'}>Dead</option>
                    <option value={'unknown'}>Unknown</option>
                </Field>
                <Field name='gender' component={renderSelectField} label='Gender' className={classes.selectField}>
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
                    className={classes.button}>
                Search
            </Button>
            <Button type="button"
                    variant="contained"
                    disabled={pristine || submitting}
                    onClick={reset}
                    className={classes.button}>
                Clear Values
            </Button>
            {error && !pristine &&
            <Typography color='error' variant='h6'>
                {error}
            </Typography>}
        </form>
    )
};

//===================== VALIDATE =============================
const validate: SearchCharactersValidateType = (values) => {
    let errors = {} as SearchCharactersErrorsType;
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

//============================ REDUX-FORM ====================================
const ReduxSearchCharactersForm = reduxForm<SearchCharactersFormValuesType, SearchCharactersFormOwnPropsType>({
    form: 'searchCharacters',
    validate
})(SearchCharactersForm);

//=========================== COMPONENT =====================================
const SearchCharacters: React.FC<SearchCharactersPropsType> = (props) => {
    const {setSearchingParams, setCurrentPage, setShowCharactersFrom} = props;

    const onSubmit = (formValue: SearchCharactersFormValuesType) => {
        setCurrentPage(1)
        setSearchingParams(formValue)
        setShowCharactersFrom('search')
    };
    return (
        <ReduxSearchCharactersForm onSubmit={onSubmit}/>
    )
};

export default SearchCharacters;

///////////////////////////////////////////////////////////////////////////////////////////

//======================== TYPES ==========================
type SearchCharactersFormOwnPropsType = {}

//====================== STYLES ============================
const useStyles = makeStyles({
    textField: {
        marginRight: 10,
        marginBottom: 10
    },
    selectField: {
        marginRight: 10,
        marginTop: 10

    },
    button: {
        textTransform: 'none',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    }
});


