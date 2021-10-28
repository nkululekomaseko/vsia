import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import { InputLabel, MenuItem, FormControl, Select, NativeSelect, InputBase, TextField, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemButton, Checkbox } from '@mui/material';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './rightbar.css';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

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

const CountryFilterList = ({countriesData, dateFilter}) => {
    const [listOpen, setListOpen] = useState(false);
    const [countryFilter, setCountryFilter] = useState({});
    

    let countryList = [];
    let tempCountryFilter = {};
    console.log("Test CountryFilter", countriesData);
    if (Object.keys(countriesData).length > 0) {
        countryList = countriesData.map(obj => {
            let country = africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
            tempCountryFilter[country] = true;
            return country;
        });
    }

    const handleListClick = () => {
        setListOpen(!listOpen);
    }

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleCheckboxChange = (event => {
        let country = event.target.id;
        let cValue = event.target.checked;
        setCountryFilter(currData => ({
            ...currData,
            [country]: cValue

        }));
        //console.log(country, cValue, countryFilter);

    });

    useEffect(() => {        
        setCountryFilter(tempCountryFilter);
        console.log(".............................countriesData", countriesData, countryList);
        
    },[countriesData]);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'blue' }}>
            <ListItemButton onClick={handleListClick}>
                <ListItemText primary="Country Filter" />
                {listOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={listOpen} timeout='auto' unmountOnExit>
                <List component="div" disablePadding>
                    {
                       countryList.length > 0 ? countryList.map((value, i) => {
                            const label = `${value}`;
                            
                            
                            return (
                                <ListItem key={i} disablePadding>
                                    <ListItemButton onClick={handleToggle(i)} dense >
                                        <ListItemIcon>
                                            <Checkbox 
                                                edge="start"
                                                checked={checked.indexOf(i) !== -1}
                                                onChange={handleCheckboxChange}
                                                disableRipple
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                id={label}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={label} primary={label} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }) : null
                    }
                </List>
            </Collapse>
        </List>
    )
}

const DropDownSelect = ({callbackFilterOption}) => {
    const classes = useStyles();
    const [yearFilter, setYearFilter] = useState("");

    const yearChangeHandler = (event) => {
        console.log(event.target.value);
        setYearFilter(event.target.value);
        callbackFilterOption(event.target.value);
    }

    return (
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
    )
};

const Rightbar = ({dateFilterCallBack, filteredDateValue, dataLoading, setFilterOption, countries_Data, date_Filter}) => {
    const classes = useStyles();
    const handleDateChange = (event) => {
        console.log("New Date: ", event.target.value);
        dateFilterCallBack(event.target.value);
    }


    return (
        <div className="rightbarContainer">
            <h3>Filter:</h3>
            {dataLoading && <CircularProgress size={24} className={classes.dateFieldProgress} />}
            <TextField 
                    id="date"
                    label="Date Filter"
                    type="date"
                    value={filteredDateValue}
                    onChange={handleDateChange}
                    variant="filled"
                    size='small'
                    // style={{minWidth: '150px'}}
                    className={classes.formControl}
                />
                <DropDownSelect callbackFilterOption={setFilterOption}/>
                {/* <CountryFilterList 
                    countriesData={countries_Data} 
                    dateFilter={date_Filter} 
                /> */}
        </div>
        // <List
        //     componen='nav'
        //     aria-labelledby='nested-list-subheader'
        // >
        //     <ListSubheader compoent='div'>
        //         Map Filter:
        //     </ListSubheader>
        //     {/* <DropDownSelect callback={dateFilterCallBack} /> */}
            
            
        //     <Grid item className={classes.dataFieldContainer}>
        //         <Grid item className={classes.dateFieldProgressContainer} >
        //             {dataLoading && <CircularProgress size={24} className={classes.dateFieldProgress} />}
        //         </Grid>
        //         <TextField 
        //             id="date"
        //             label="Date Filter"
        //             type="date"
        //             value={filteredDateValue}
        //             onChange={handleDateChange}
        //             variant="filled"
        //             size='small'
        //             style={{minWidth: '150px'}}
        //             className={classes.formControl}
        //         />
        //         <DropDownSelect callbackFilterOption={setFilterOption}/>
        //         <CountryFilterList countriesData={countries_Data} 
        //             dateFilter={date_Filter} />
                
        //     </Grid>

        // </List>
    )
};

export default Rightbar
