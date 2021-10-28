import React, { useState, useEffect } from 'react';
import './map.css';
import { MapContainer, TileLayer, Marker, Popup , GeoJSON} from 'react-leaflet';
import { Container, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Rightbar from '../rightbar/Rightbar';
import MlabContainer from '../mlab/MlabContainer';
//import { countries_json } from  '../../data/countries';
import { fetchGeoData, fetchGeoDataFile, fetchMLabDataPerDate } from '../api/Api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    mapContainer: {
        height: '650px'
    },
    mapDetailsStyle: {
        padding: '6px 8px',
        font: '14px/16px Arial, Helvetica, sans-serif',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px'
    }
}));

// const africanCountries_ISO_3 = ["TUN", "UGA", "ESH", "ZMB", "ZWE"];

// const africanCountries_ISO_2 = ["TN", "UG", "EH", "ZM", "ZW"];

// const africanCountries = ["TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]
const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]
const africanCountries_ISO_3 = ["DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "CIV", "DJI", "EGY", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "KEN", "LSO", "LBR", "LBY", "MDG", "MLI", "MWI", "MRT", "MUS", "MYT", "MAR", "MOZ", "NAM", "NER", "NGA", "REU", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "SWZ", "TZA", "TGO", "TUN", "UGA", "ESH", "ZMB", "ZWE"];

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];
// const africanCountries_ISO_3 = ["DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "CIV", "DJI", "EGY", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "KEN", "LSO", "LBR", "LBY", "MDG", "MLI", "MWI", "MRT", "MUS", "MYT", "MAR", "MOZ", "NAM", "NER", "NGA", "REU", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "SWZ", "TZA", "TGO", "TUN", "UGA", "ESH", "ZMB", "ZWE"];

// const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];




const africanCountriesMapping = (countryCodeISO3) => {
    return africanCountries_ISO_2[africanCountries_ISO_3.indexOf(countryCodeISO3)];
}

const getFilteredMlabData = (filteredDataList, filterOption, country_code) => {
    let targetArrayResult = filteredDataList.filter(item => (item.country_code === country_code));
    let finalResultValue = targetArrayResult && targetArrayResult[0] ? targetArrayResult[0][filterOption] : -1;

    return finalResultValue;
};

const checkCountryCode = (code, countries_list) => {
    let result = false;
    countries_list.forEach(country => {
        if (country == code) {
            result = true;
        }
    })
    return result;
}

const getColor = (d) => {
    return d > 12.0  ? '#800021' :
           d > 10.0   ? '#BD0026' :
           d > 8.0    ? '#E31A1C' :
           d > 6.0     ? '#FC4E2A' :
           d > 4.0   ? '#FD8D3C' :
           d > 2.0       ? '#FEB24C' :
           d > 0.0        ? '#FED976' :
                        '#FFEDA1';
}

let featureStyle = (feature) => {
    return {
        fillColor: getColor(feature.properties.floatValue),
        // fillColor: "#ff0000",
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

const POSITION_CLASSES = {
    topright: "leaflet-top leaflet-right"
};
const MapDetail = () => {
    const classes = useStyles();
    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <div className={`info ${classes.mapDetailsStyle}`}>
                    <h4>MLAB Speed Data for African Countries</h4>
                    "Hover over a state"
                </div>
            </div>
        </div>
    );
};



const Map = () => {
    const classes = useStyles();
    const mapOptions = {
        center: [9.1021, 17.2812], //Center of Africa
        zoom: 3
    };
    
    const position = [51.505, -0.09];

    const [geoData, getGeoData] = useState({});
    const [geoDataFileObject, setGeoDataFileObject] = useState({});
    const [dateFilter, setDateFilter] = useState("2021-01-01");
    const [filterType, setFilterType] = useState("download_AVG");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mlabDataDate, setMlabDataDate] = useState({});
  


    // useEffect(async () => {
    //     console.log("Fetching Data...");
    //     const data = await fetchGeoData();
    //     console.log("Done...");
    //     console.log(JSON.parse(data));
    // }, [getGeoData]);

    const setDateFromFilterBar = function(val) {
        setDateFilter(val);
    }

    const infoUpdate = (props) => {
        let infoDiv = document.getElementsByClassName("info")[0];
        infoDiv.innerHTML = '<h4>MLAB Speed Data for African Countries</h4>' + 
            (props ? '<b>' + props.CountryName + '</b><br /> Date: <b>' + dateFilter + '</b></br><b>' +
            filterType + '</b>: ' + props.floatValue
            : 'Hover over a country');
    };
    
    const highlightFeature = (e) => {
        let layer = e.target;

        layer.setStyle ({
            weight:5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        layer.bringToFront();
        infoUpdate(layer.feature.properties);
    };

    const resetHighlight = (e) => {
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
        infoUpdate(null);
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight
          //click: onClick
        });
      };

    

    useEffect(async () => {
        setSuccess(false);
        setLoading(true);
        console.log("Fetching Date filtered data...");
        const result = await fetchMLabDataPerDate(dateFilter);
        const dateFilterData = JSON.parse(result);
        console.log("Mlab Data: ", (dateFilterData));
        console.log("Done fetching Date filtered data...");

        console.log("Fetching file Data from API...");
        const data = await fetchGeoDataFile();
        console.log("Done fetching file Data from API...");
        setSuccess(true);
        setLoading(false);
        //console.log("Filter Method: ", getFilteredMlabData(dateFilterData, "download_AVG", "ZA"));
        //console.log(africanCountriesMapping("ZAF"));
        let newFeatures = data["features"].filter(items => checkCountryCode(items['properties']['ISO_A3'], africanCountries_ISO_3));
        let newFeaturesMerged = newFeatures.map(item => {
            return {
                type: item['type'],
                properties: {
                    CountryName: item['properties']['ADMIN'],
                    CountryCode: item['properties']['ISO_A3'],
                    date: dateFilter,
                    floatValue: getFilteredMlabData(dateFilterData, filterType, africanCountriesMapping(item['properties']['ISO_A3'])),
                },
                geometry: item['geometry']
                
            }
        });
        console.log("....................................New Features Merged: ", newFeaturesMerged);
        data["features"] = newFeaturesMerged;
        if (Object.keys(geoDataFileObject).length !== 0){
            setGeoDataFileObject({});
            setGeoDataFileObject(data);
        } else {
            setGeoDataFileObject(data);
        }
            
        console.log("geoDataFileObject: ", geoDataFileObject);
    }, [dateFilter, filterType])
    
    const API_KEY = "d2d948fd-9f35-476a-a5e8-0acfda2f13ec";
    return (
        <div className="mainContainer">
            <div className="leftbar">
                <MapContainer className={classes.mapContainer} center={mapOptions.center} zoom={mapOptions.zoom} scrollWheelZoom={false}>
                    <TileLayer 
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=d2d948fd-9f35-476a-a5e8-0acfda2f13ec"
                    />

                    {/* <Marker position={mapOptions.center} zoom={mapOptions.zoom}>
                        <Popup>
                            {`Testing popup on position ${mapOptions.center}`} 
                        </Popup>
                    </Marker> */}
                    {geoDataFileObject["features"] && <GeoJSON onEachFeature={onEachFeature} style={featureStyle} data={geoDataFileObject} />}
                    <MapDetail />
                </MapContainer>
                <MlabContainer 
                    date={dateFilter} 
                    options={filterType} 
                    iso_2={africanCountries_ISO_2} 
                    iso_3={africanCountries_ISO_3} 
                    countries={africanCountries} 
                    setMlabFilter={setMlabDataDate}
                />
            </div>
            <div className="rightbar">
                <Rightbar 
                    dateFilterCallBack={setDateFromFilterBar} 
                    filteredDateValue={dateFilter} 
                    dataLoading={loading} 
                    setFilterOption={setFilterType}
                    countries_Data={mlabDataDate} 
                    date_Filter={dateFilter}
                />
            </div>
        
            
           
        </div>
    )
};

export default Map