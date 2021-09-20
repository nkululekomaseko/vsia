
import './uploadChart.css';
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const UploadChart = ({uploadData, dateFilter}) => {
    console.log("uploadData MLab Data: ", uploadData);
    console.log("Loaded uploadData");

    let chartLabels = [];

    let upload_AVG = [];
    let upload_MAX = [];
    let upload_MED = [];
    let upload_Q25 = [];
    let upload_Q75 = [];

    if (Object.keys(uploadData).length > 0) {
        chartLabels = uploadData.map(obj => {
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
        });
    
        upload_AVG = uploadData.map(obj => {
            return obj["upload_AVG"];
        });
    
        upload_MAX = uploadData.map(obj => {
            return obj["upload_MAX"];
        });
    
        upload_MED = uploadData.map(obj => {
            return obj["upload_MED"];
        });
    
        upload_Q25 = uploadData.map(obj => {
            return obj["upload_Q25"];
        });
    
        upload_Q75 = uploadData.map(obj => {
            return obj["upload_Q75"];
        });
    }

    console.log("Chart Labels: ", chartLabels);
    console.log("upload_AVG: ", upload_AVG);
    console.log("upload_MAX: ", upload_MAX);
    console.log("upload_MED: ", upload_MED);
    console.log("upload_Q25: ", upload_Q25);
    console.log("upload_Q75: ", upload_Q75);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "upload_AVG",
                data: upload_AVG,
                fill: true,
                backgroundColor: '#f72585',
                borderColor: '#f72585'
            },
            {
                label: "upload_MAX",
                data: upload_MAX,
                fill: true,
                backgroundColor: '#7209b7',
                borderColor: '#7209b7'
            },
            {
                label: "upload_MED",
                data: upload_MED,
                fill: true,
                backgroundColor: '#480ca8',
                borderColor: '#480ca8'
            },
            {
                label: "upload_Q25",
                data: upload_Q25,
                fill: true,
                backgroundColor: '#4361ee',
                borderColor: '#4361ee'
            },
            {
                label: "upload_Q75",
                data: upload_Q75,
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
        <div className='uploadChartContainer'>
            <Typography variant="h5">Performance - Upload Speed by Country (Mbps) - {dateFilter}</Typography>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default UploadChart
