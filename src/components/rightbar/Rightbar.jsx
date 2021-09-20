import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import { InputLabel, MenuItem, FormControl, Select, NativeSelect, InputBase, TextField, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '120px',
    },
    dateFieldProgress: {
        color: green[500],
    },
    dateFieldProgressContainer: {
        margin: theme.spacing(1),
        minWidth: '30px',
    },
    dataFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '5px'
    }

}));

const DropDownSelect = ({callbackFilterOption}) => {
    const classes = useStyles();
    const [yearFilter, setYearFilter] = useState("");

    const yearChangeHandler = (event) => {
        console.log(event.target.value);
        setYearFilter(event.target.value);
        callbackFilterOption(event.target.value);
    }

    return (
        <Grid container >
            <FormControl variant='filled' className={classes.formControl} size='small'>
                <InputLabel >Filter Option</InputLabel>
                <Select 
                    value={yearFilter}
                    onChange={yearChangeHandler}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={'download_AVG'}><em>Download AVG</em></MenuItem>
                    <MenuItem value={'download_MAX'}><em>Download MAX</em></MenuItem>
                    <MenuItem value={'download_MED'}><em>Download MED</em></MenuItem>
                    <MenuItem value={'download_Q25'}><em>Download Q25</em></MenuItem>
                    <MenuItem value={'download_Q75'}><em>Download 75</em></MenuItem>
                    <MenuItem value={'download_minRTT_MED'}><em>Downlad min RTT MED</em></MenuItem>
                    <MenuItem value={'dl_minRTT_LOG_AVG_rndl'}><em>Download min RTT LOG AVG rndl</em></MenuItem>
                    <MenuItem value={'upload_AVG'}><em>Upload AVG</em></MenuItem>
                    <MenuItem value={'upload_MAX'}><em>Upload MAX</em></MenuItem>
                    <MenuItem value={'upload_MED'}><em>Upload MED</em></MenuItem>
                    <MenuItem value={'upload_Q25'}><em>Upload Q25</em></MenuItem>
                    <MenuItem value={'upload_Q75'}><em>Upload 75</em></MenuItem>
                    <MenuItem value={'upload_minRTT_MED'}><em>Upload min RTT MED</em></MenuItem>
                    <MenuItem value={'ul_minRTT_LOG_AVG_rndl'}><em>Upload min RTT LOG AVG rndl</em></MenuItem>
                </Select>
            </FormControl>
        </Grid>
        
    )
};

const Rightbar = ({dateFilterCallBack, filteredDateValue, dataLoading, setFilterOption}) => {
    const classes = useStyles();
    const handleDateChange = (event) => {
        console.log("New Date: ", event.target.value);
        dateFilterCallBack(event.target.value);
    }

    return (
        <List
            componen='nav'
            aria-labelledby='nested-list-subheader'
        >
            <ListSubheader compoent='div'>
                Map Filter:
            </ListSubheader>
            {/* <DropDownSelect callback={dateFilterCallBack} /> */}
            
            
            <Grid item className={classes.dataFieldContainer}>
                <Grid item className={classes.dateFieldProgressContainer} >
                    {dataLoading && <CircularProgress size={24} className={classes.dateFieldProgress} />}
                </Grid>
                <TextField 
                    id="date"
                    label="Date Filter"
                    type="date"
                    value={filteredDateValue}
                    onChange={handleDateChange}
                    variant="filled"
                    size='small'
                    style={{minWidth: '150px'}}
                    className={classes.formControl}
                />
                <DropDownSelect callbackFilterOption={setFilterOption}/>
                
            </Grid>

        </List>
    )
};

export default Rightbar
