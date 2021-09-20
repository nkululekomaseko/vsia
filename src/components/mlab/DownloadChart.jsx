import './downloadChart.css';
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const UploadChart = ({downloadData, dateFilter}) => {
    console.log("uploadData MLab Data: ", downloadData);
    console.log("Loaded uploadData");

    let chartLabels = [];

    let download_AVG = [];
    let download_MAX = [];
    let download_MED = [];
    let download_Q25 = [];
    let download_Q75 = [];

    if (Object.keys(downloadData).length > 0) {
        chartLabels = downloadData.map(obj => {
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
        });
    
        download_AVG = downloadData.map(obj => {
            return obj["download_AVG"];
        });
    
        download_MAX = downloadData.map(obj => {
            return obj["download_MAX"];
        });
    
        download_MED = downloadData.map(obj => {
            return obj["download_MED"];
        });
    
        download_Q25 = downloadData.map(obj => {
            return obj["download_Q25"];
        });
    
        download_Q75 = downloadData.map(obj => {
            return obj["download_Q75"];
        });
    }

    console.log("Chart Labels: ", chartLabels);
    console.log("download_AVG: ", download_AVG);
    console.log("download_MAX: ", download_MAX);
    console.log("download_MED: ", download_MED);
    console.log("download_Q25: ", download_Q25);
    console.log("download_Q75: ", download_Q75);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "download_AVG",
                data: download_AVG,
                fill: true,
                backgroundColor: '#f72585',
                borderColor: '#f72585'
            },
            {
                label: "download_MAX",
                data: download_MAX,
                fill: true,
                backgroundColor: '#7209b7',
                borderColor: '#7209b7'
            },
            {
                label: "download_MED",
                data: download_MED,
                fill: true,
                backgroundColor: '#480ca8',
                borderColor: '#480ca8'
            },
            {
                label: "download_Q25",
                data: download_Q25,
                fill: true,
                backgroundColor: '#4361ee',
                borderColor: '#4361ee'
            },
            {
                label: "download_Q75",
                data: download_Q75,
                fill: true,
                backgroundColor: '#4cc9f0',
                borderColor: '#4cc9f0'
            }
        ]
    }

    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <div className='downloadChartContainer'>
            <Typography variant="h5">Performance - Download Speed by Country (Mbps) - {dateFilter}</Typography>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default UploadChart
