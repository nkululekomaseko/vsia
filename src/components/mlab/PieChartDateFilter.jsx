import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import './pieChartDataFilter.css'

const PieChartDateFilter = ({pieChartData, dateFilter, filterOption}) => {

    

    const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

    const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

    console.log("pieChartData MLab Data: ", pieChartData);
    console.log("Loaded pieChartData");

    let chartLabels = [];
    let pieChart = [];
    let colours = [];

    if (Object.keys(pieChartData).length > 0) {
        chartLabels = pieChartData.map((obj, i) => {
            colours.push(`rgba(${(16 * i) % 256},${(256 - 16 * i) % 256},${(32 * i) % 256},0.8)`);
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];

        });
        console.log("....................", chartLabels);

        pieChart = pieChartData.map(obj => {
            return obj[filterOption];
        });
        console.log("....................", filterOption);
        console.log("....................colours", colours);
    }

    console.log("pieChartData: ", pieChart);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: {filterOption},
                data: pieChart,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
            }
        ]
    }

    return (
        <div className="pieChartContainer">
            <Typography variant="h5">Performance - {filterOption} (Mbps) - {dateFilter}</Typography>
            <Pie data={chartData}/>
        </div>
    )
}

export default PieChartDateFilter
