import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      }
    }),
);

const App = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Header/>
        <Sidebar/>
        <Main/>
      </div>
  );
}

export default App;
