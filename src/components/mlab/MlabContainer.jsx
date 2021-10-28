
import React, {useState, useEffect} from 'react';
import {fetchMLabDataPerDate} from '../api/Api';
import LatencyChart from './LatencyChart';
import LogAverageChart from './LogAverageChart';
import CountryFilter from './CountryFilter';
import CountryFilterList from './CountryFilterList';
import UploadChart from './UploadChart';
import DownloadChart from './DownloadChart';
import PieChartDateFilter from './PieChartDateFilter';
import './mlabContainer.css';

const africanCountries_ISO_3 = ["DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "CIV", "DJI", "EGY", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "KEN", "LSO", "LBR", "LBY", "MDG", "MLI", "MWI", "MRT", "MUS", "MYT", "MAR", "MOZ", "NAM", "NER", "NGA", "REU", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "SWZ", "TZA", "TGO", "TUN", "UGA", "ESH", "ZMB", "ZWE"];

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const checkCountryCode = (code, countries_list) => {
    let result = false;
    countries_list.forEach(country => {
        if (country == code) {
            result = true;
        }
    })
    return result;
}

const MlabContainer = ({date, options , iso_2, iso_3, countries, setMlabFilter}) => {

    const [mlabDataDate, setMlabDataDate] = useState({});
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>mlabDataDate", mlabDataDate);

    useEffect(async () => {
        console.log("Fetching Date filtered data...");
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>date", date);
        const result = await fetchMLabDataPerDate(date);
        const tempDateFilterData = JSON.parse(result);
        const dateFilterData = tempDateFilterData.filter(countryData => checkCountryCode(countryData.country_code, iso_2));
        setMlabDataDate(dateFilterData);
        setMlabFilter(mlabDataDate);
        //console.log("Mlab Data: ", (dateFilterData));
        console.log("Done fetching Date filtered data...");
    }, [date]);    
    return (
        <div className='mlabContainer'>
            {/* <div className="chartFilter">
                <CountryFilterList countriesData={mlabDataDate} dateFilter={date}/>
            </div> */}
            <div className="charts">
                <PieChartDateFilter pieChartData={mlabDataDate} dateFilter={date} filterOption={options} />
                <LatencyChart latencyData={mlabDataDate} dateFilter={date}/>
                <LogAverageChart logAverage={mlabDataDate} dateFilter={date}/>
                <UploadChart uploadData={mlabDataDate} dateFilter={date}/>
                <DownloadChart downloadData={mlabDataDate} dateFilter={date}/>
            </div>
            
            
        </div>
    )
}

export default MlabContainer
