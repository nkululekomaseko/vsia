import React from 'react';

const MLAB_WorldCountries_Endpoint = 'http://127.0.0.1:5000/mlab/worldCountries';
const GeoJSON_Data_Endpoint = 'http://127.0.0.1:5000/mlab/getCountriesGeojson';
const MLAB_Data_Date_Endpoint = (date) => (`http://127.0.0.1:5000/mlab/${date}/datedata`);

export const fetchGeoData = async () => {
    const response = await fetch(MLAB_WorldCountries_Endpoint);
    const data = await response.json();
    return data;
}

export const fetchGeoDataFile = async () => {
    const response = await fetch(GeoJSON_Data_Endpoint);
    const data = await response.json();
    return data;
}

export const fetchMLabDataPerDate = async (date) => {
    const response = await fetch(MLAB_Data_Date_Endpoint(date));
    const data = await response.json();
    return data;
}

