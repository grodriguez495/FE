import axios from 'axios';
import { urlGetSensorValues, urlGetSensorValuesByDatesAndVariable,urlGetSensorValueBySensor } from '../endpoints';

export async function getBarrasPM25Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    return {

        labels,
        datasets: [

            {
                label: 'Pm25',
                data ,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getBarrasPM10Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    return {

        labels,
        datasets: [

            {
                label: 'Pm10',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getBarrasCO2Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Co2',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getBarrasTemperatureData(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);   
    return {

        labels,
        datasets: [

            {
                label: 'Temperature',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
}
export async function getBarrasHumidityData(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
   
    return {

        labels,
        datasets: [

            {
                label: 'Humidity',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};

export async function getSensorValuesByDatesAndVariableResponse(dateFrom, dateTo, variableId) {

    const { data } = await axios.get(urlGetSensorValuesByDatesAndVariable, {
        params: {
            variableId: variableId,
            dateFrom: dateFrom,
            dateTo: dateTo
        }
    });
    var result = data.filter(element => element.variableId === variableId).map(sensor => parseFloat(sensor.value))
    console.log("respuesta del BE", result);
   
return result
}
export async function getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId ) {
    return await  getSensorValuesByDatesAndVariableResponse(dateFrom, dateTo, variableId );
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
    console.log("date", arr);
    return arr;
};
export function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
}

export function colorRGBA() {
    var coolor = "(" + generarNumero(105) + "," + generarNumero(105) + "," + generarNumero(105) + "," + generarNumero(1) + ")";
    return "rgba" + coolor;
}
export async function getPiePM25Data(dateFrom, dateTo, variableId) {
    var Datelabels = getDaysLabels(dateFrom, dateTo);
    var colorsArray = [];
    for (let i = 0; i < Datelabels.length; i++) {
        colorsArray.push(colorRGBA());
    }
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels: Datelabels
        ,
        datasets: [
            {
                label: 'Variable por dia',
                data,
                backgroundColor: colorsArray,
                borderColor: colorsArray,
                borderWidth: 1,
            },
        ]
    };
};
export async function getPiePM10Data(dateFrom, dateTo, variableId) {
    var Datelabels = getDaysLabels(dateFrom, dateTo);
    var colorsArray = [];
    for (let i = 0; i < Datelabels.length; i++) {
        colorsArray.push(colorRGBA());
    }
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels: getDaysLabels(dateFrom, dateTo),
        datasets: [
            {
                label: 'Variable por dia',
                data,
                backgroundColor: colorsArray,
                borderColor: colorsArray,
                borderWidth: 1,
            },
        ]
    };
};
export async function getPieCO2Data(dateFrom, dateTo, variableId) {
    var Datelabels = getDaysLabels(dateFrom, dateTo);
    var colorsArray = [];
    for (let i = 0; i < Datelabels.length; i++) {
        colorsArray.push(colorRGBA());
    }
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {
        labels: getDaysLabels(dateFrom, dateTo),
        datasets: [
            {
                label: 'Variable por dia',
                data,
                backgroundColor: colorsArray,
                borderColor: colorsArray,
                borderWidth: 1,
            },
        ]
    };
};
export async function getPieTemperatureData(dateFrom, dateTo, variableId) {
    var Datelabels = getDaysLabels(dateFrom, dateTo);
    var colorsArray = [];
    for (let i = 0; i < Datelabels.length; i++) {
        colorsArray.push(colorRGBA());
    }
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels: getDaysLabels(dateFrom, dateTo),
        datasets: [
            {
                label: 'Variable por dia',
                data,
                backgroundColor: colorsArray,
                borderColor: colorsArray,
                borderWidth: 1,
            },
        ]
    };
};
export async function getPieHumidityData(dateFrom, dateTo, variableId) {
    var Datelabels = getDaysLabels(dateFrom, dateTo);
    var colorsArray = [];
    for (let i = 0; i < Datelabels.length; i++) {
        colorsArray.push(colorRGBA());
    }
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels: getDaysLabels(dateFrom, dateTo),
        datasets: [
            {
                label: 'Variable por dia',
                data,
                backgroundColor: colorsArray,
                borderColor: colorsArray,
                borderWidth: 1,
            },
        ]
    };
};
export async function getLinePM25Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Pm25',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getLinePM10Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Pm10',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getLineCO2Data(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Co2',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getLineTemperatureData(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Temperature',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getLineHumidityData(dateFrom, dateTo, variableId) {
    const labels = getDaysLabels(dateFrom, dateTo);
    let data = await getsensorValuesByDateAndVariable(dateFrom, dateTo, variableId);
    
    return {

        labels,
        datasets: [

            {
                label: 'Humidity',
                data,
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
};
export async function getSensorDataPerSensor(sensor) {

    const { data } = await axios.get(urlGetSensorValueBySensor, {
        params: {
            sensor: sensor
        }
    });
    console.log("respuesta del BE", data);

return data
}

export async function getSensorDataDashboard(sensor){
    return await getSensorDataPerSensor(sensor);
}