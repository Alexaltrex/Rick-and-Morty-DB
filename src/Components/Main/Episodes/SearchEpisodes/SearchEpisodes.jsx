import React from 'react';
import {Button, Typography} from "@material-ui/core";
import {reduxForm, Field} from 'redux-form'
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import RenderTextField from "../../../Common/RenderTextField/RenderTextField";

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
const SearchEpisodesForm = (props) => {
    const classes = useStyles();
    const {handleSubmit, submitting, pristine, reset, error} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='name' component={RenderTextField} label='Name' variant="outlined" size='small'
                       className={classes.field}/>
                <Field name='episode' component={RenderTextField} label='Episode' variant="outlined" size='small'
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
const validate = (values) => {
    const empty = (str) => /^\s+$/.test(str)
    let errors = {};
    if (empty(values.name) && values.name !== '') {
        errors.name = 'name field is empty'
    }
    if (empty(values.episode) && values.episode !== '') {
        errors.episode = 'episode field is empty'
    }
    if ((!values.name || empty(values.name)) && (!values.episode || empty(values.episode))) {
        errors._error = 'At least one member must be entered';
    }
    return errors;
}

////////////////////////////////////////////////////////////////////////////////////////////
const ReduxSearchEpisodesForm = reduxForm({
    form: 'searchEpisodes',
    validate
})(SearchEpisodesForm);

const SearchEpisodes = (props) => {
    const {setShowEpisodesFromSearch, setSearchingParams, setCurrentPage} = props;
    const onSubmit = (formValue) => {
        // if (в форму введены валидные данный) {
        // setSearchingParams(formValue)
        // setShowCharactersFromSearch(true);
        // }
        console.log(formValue);
        setSearchingParams(formValue);
        setShowEpisodesFromSearch(true);
    }
    return (
        <ReduxSearchEpisodesForm onSubmit={onSubmit}/>
    )
};

export default SearchEpisodes