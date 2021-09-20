
import './logAverageChart.css';
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

const africanCountries_ISO_2 = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "ML", "MW", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"];

const africanCountries = ["ALGERIA", "ANGOLA", "BENIN", "BOTSWANA", "BURKINA FASO", "BURUNDI", "CAMEROON", "CAPE VERDE", "CENTRAL AFRICAN REPUBLIC", "CHAD", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COTE D’IVOIRE", "DJIBOUTI", "EGYPT", "EQUATORIAL GUINEA", "ERITREA", "ETHIOPIA", "GABON", "GAMBIA", "GHANA", "GUINEA", "GUINEA-BISSAU", "KENYA", "LESOTHO", "LIBERIA", "LIBYAN ARAB JAMAHIRIYA", "MADAGASCAR", "MALI", "MALAWI", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NIGER", "NIGERIA", "REUNION ISLAND", "RWANDA", "SAO TOME AND PRINCIPE", "SENEGAL", "SEYCHELLES", "SIERRA LEONE", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SUDAN", "SWAZILAND", "TANZANIA, UNITED REPUBLIC OF", "TOGO", "TUNISIA", "UGANDA", "WESTERN SAHARA", "ZAMBIA", "ZIMBABWE"]

const LatencyChart = ({logAverage, dateFilter}) => {
    console.log("logAverage MLab Data: ", logAverage);
    console.log("Loaded LatencyChart");

    let chartLabels = [];

    let download_log_average_data = [];

    let upload_log_average_data = [];
    if (Object.keys(logAverage).length > 0) {
        chartLabels = logAverage.map(obj => {
            return africanCountries[africanCountries_ISO_2.indexOf(obj["country_code"])];
        });
    
        download_log_average_data = logAverage.map(obj => {
            return obj["dl_minRTT_LOG_AVG_rnd1"];
        });
    
        upload_log_average_data = logAverage.map(obj => {
            return obj["ul_minRTT_LOG_AVG_rnd1"];
        });
    }
    console.log("download_log_average_data", download_log_average_data);
    console.log("upload_log_average_data", upload_log_average_data);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Download minRTT LOG AVG",
                data: download_log_average_data,
                fill: false,
                backgroundColor: '#f72585',
                borderColor: '#f72585'
            },
            {
                label: "Upload minRTT LOG AVG",
                data: upload_log_average_data,
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
        <div className='logAverageChartContainer'>
            <Typography variant="h5">Performance - Log Average (Mbps) - {dateFilter}</Typography>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default LatencyChart
