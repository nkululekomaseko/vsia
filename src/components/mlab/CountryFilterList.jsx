import React, {useState, useEffect} from 'react';
import { List, ListItemButton, ListItemText,  Collapse, Checkbox, ListItem, ListItemIcon } from '@mui/material';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const CountryFilterList = ({countriesData, dateFilter}) => {
    const [listOpen, setListOpen] = useState(false);
    const [countryFilter, setCountryFilter] = useState({});

    let countryList = [];
    console.log("Test CountryFilter", countriesData);
    if (Object.keys(countriesData).length > 0) {
        countryList = countriesData.map(obj => {
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
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
        console.log(event.target);
    });

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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

export default CountryFilterList
