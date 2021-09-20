
import './latencyChart.css'
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const LatencyChart = ({latencyData, dateFilter}) => {
    console.log("LatencyChart MLab Data: ", latencyData);
    console.log("Loaded LatencyChart");

    let chartLabels = [];

    let download_minRTT_MED_Data = [];

    let upload_minRTT_MED_Data = [];
    if (Object.keys(latencyData).length > 0) {
        chartLabels = latencyData.map(obj => {
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
        });
    
        download_minRTT_MED_Data = latencyData.map(obj => {
            return obj["download_minRTT_MED"];
        });
    
        upload_minRTT_MED_Data = latencyData.map(obj => {
            return obj["upload_minRTT_MED"];
        });
    }

    console.log("Chart Labels: ", chartLabels);
    console.log("download_minRTT_MED_Data: ", download_minRTT_MED_Data);
    console.log("upload_minRTT_MED_Data: ", upload_minRTT_MED_Data);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Download minRTT MED",
                data: download_minRTT_MED_Data,
                fill: false,
                backgroundColor: '#f72585',
                borderColor: '#f72585'
            },
            {
                label: "Upload minRTT MED",
                data: upload_minRTT_MED_Data,
                fill: false,
                backgroundColor: '#4361ee',
                borderColor: '#4361ee'
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
        <div className='latencyChartContainer'>
            
            <Typography variant="h5">Performance - Latency by Country (Mbps) - {dateFilter} </Typography>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default LatencyChart
