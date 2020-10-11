import React, {ChangeEvent} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createStyles } from '@material-ui/core';
import {Pagination} from "@material-ui/lab";

const Paginator: React.FC<PropsType> = (props: any) => {
    const {totalPaginatorPagesCount, onPaginatorItemClick, currentPage} = props
    const classes = useStyles();
    const onChange = (event: ChangeEvent<unknown>, currentPage: number) => {
        onPaginatorItemClick(currentPage);
    }
    return (
        <div className={classes.root}>
           <Pagination onChange={onChange}
                       page={currentPage}
                       showFirstButton
                       showLastButton
                       count={totalPaginatorPagesCount}
                       variant="outlined"
                       size='small'
                       shape="rounded" />
        </div>
    );
}

export default Paginator;

//========================== TYPES ===========================
type PropsType = {
    totalPaginatorPagesCount: number
    currentPage: number
    onPaginatorItemClick: (currentPage: number) => void
}

//========================== STYLES ===========================
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
        },
    }),
);

