import axios from 'axios';
import { urlGetSensorValues, urlGetSensorValuesByDatesAndVariable,urlGetSensorValueBySensor,urlGetSensorValuesByDatesAndVariableAndSensor } from '../endpoints';


export async function getBarrasPM25Data(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
    return data;
};
export async function getBarrasPM10Data(sensor,dateFrom, dateTo, variableId) {
    
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
    return data;
};
export async function getBarrasCO2Data(sensor,dateFrom, dateTo, variableId) {
  
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
    
    return data;
};
export async function getBarrasTemperatureData(sensor,dateFrom, dateTo, variableId) {
   
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
}
export async function getBarrasHumidityData(sensor,dateFrom, dateTo, variableId) {
   
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
   
    return data;
};

export async function getSensorValuesByDatesAndVariableResponse(sensor,dateFrom, dateTo, variableId) {
    console.log("***llego el sensor",sensor);
    console.log("***llego el variable",variableId);
    console.log("***llego el datefrom",dateFrom);
    console.log("***llego el dateTo",dateTo);
    const { data } = await axios.get(urlGetSensorValuesByDatesAndVariableAndSensor, {
        params: {
            variableId: variableId,
            dateFrom: dateFrom,
            dateTo: dateTo,
            sensor: sensor
        }
    });
    var result = data;
   
return result
}
export async function getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId ) {
    return await  getSensorValuesByDatesAndVariableResponse(sensor,dateFrom, dateTo, variableId );
};
export function getDaysLabels(dateFrom, dateTo) {
    for (var arr = [], dt = new Date(dateFrom); dt <= new Date(dateTo); dt.setDate(dt.getDate() + 1)) {
        const year = dt.toLocaleString('default', { year: 'numeric' });
        const month = dt.toLocaleString('default', {
            month: '2-digit',
        });
        const day = dt.toLocaleString('default', { day: '2-digit' });


        arr.push([year, month, day].join('-'));
    }
    return arr;
};
export function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
}

export function colorRGBA() {
    var coolor = "(" + generarNumero(105) + "," + generarNumero(105) + "," + generarNumero(105) + "," + generarNumero(1) + ")";
    return "rgba" + coolor;
}
export async function getPiePM25Data(sensor,dateFrom, dateTo, variableId) {
   
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);  
    return data;
};
export async function getPiePM10Data(sensor,dateFrom, dateTo, variableId) {
    
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
};
export async function getPieCO2Data(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
};
export async function getPieTemperatureData(sensor,dateFrom, dateTo, variableId) {
   
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId); 
    return data;
};
export async function getPieHumidityData(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
};
export async function getLinePM25Data(sensor,dateFrom, dateTo, variableId) {
    
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
    return data;
};
export async function getLinePM10Data(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
};
export async function getLineCO2Data(sensor,dateFrom, dateTo, variableId) {
     let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);   
    return data;
};
export async function getLineTemperatureData(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);  
    return data;
};
export async function getLineHumidityData(sensor,dateFrom, dateTo, variableId) {
    let data = await getsensorValuesByDateAndVariable(sensor,dateFrom, dateTo, variableId);
    return data;
};
export async function getSensorDataPerSensor(sensor) {

    const { data } = await axios.get(urlGetSensorValueBySensor, {
        params: {
            sensor: sensor
        }
    });
return data
}

export async function getSensorDataDashboard(sensor){
    return await getSensorDataPerSensor(sensor);
}