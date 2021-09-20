import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        marginBottom: '30px'
    },
    title: {
        flexGrow: 1
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position='static'>
            <Toolbar>
                <MultilineChartIcon fontSize="large" />
                <Typography variant="h5" className={classes.title}>
                    Visualizing State of Internet In Africa
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Header;