import * as React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px #ccc solid',
        paddingLeft: 10,
        '&:nth-of-type(odd)': {
            backgroundColor: '#ccc',
        },
    },

});

const RowCustom: React.FC<RowCustomPropsTypes> = (props) => {
    const classes = useStyles()
    const {leftContent, rightContent} = props
    return (
        <div className={classes.row}>
            <Typography variant='subtitle1'>{leftContent}</Typography>
            <Typography variant='h6' color='primary'>{rightContent}</Typography>
        </div>
    )
};

export default RowCustom;

type RowCustomPropsTypes = {
    leftContent: string
    rightContent: string
}