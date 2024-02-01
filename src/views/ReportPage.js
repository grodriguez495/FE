import React, { useCallback, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from '../assets/css/reportes.module.css'
import projectStyles from '../assets/css/style.module.css'
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
    Dropdown,

} from "react-bootstrap";
import Modal from 'react-modal';
import axios from 'axios';
import { urlGetSensorIds, urlGetSensorValueBySensor } from '../endpoints';
import { CardBody, CardTitle } from 'reactstrap'
import { getBarrasCO2Data, getBarrasHumidityData, getBarrasPM10Data, getBarrasPM25Data, getBarrasTemperatureData, getLineCO2Data, getLineHumidityData, getLinePM10Data, getLinePM25Data, getLineTemperatureData, getPieCO2Data, getPieHumidityData, getPiePM10Data, getPiePM25Data, getPieTemperatureData } from './Calculation'
import ChartistGraph from "react-chartist";
import CanvasJSReact from "@canvasjs/charts";

function ReportPage(){

    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);
    const [report, setReport] = useState("1");
    const [sensor, setSensor] = useState();
    const [variable, setVariable] = useState("1");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [sensorId, setSensorId] = useState([]);
    const [sensorSelected, setSensorSelected] = useState();


    useEffect(() => {
        getSensorIdsResponse();
    })

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const getSensorIdsResponse = async () => {
        const { data } = await axios.get(urlGetSensorIds);
        setSensorId(data);
    }

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const FromDatePicker = () => {
        const handleFromDateChange = (date) => {
            setSelectedFromDate(date);
        }
        return (
            <DatePicker
                selected={selectedFromDate}
                onChange={handleFromDateChange}
                dateFormat={"dd/MM/yyyy"}
                placeholderText='From'
            />
        );

    };
    const ToDatePicker = () => {
        const handleToDateChange = (date) => {
            setSelectedToDate(date);
        }
        return (
            <DatePicker
                selected={selectedToDate}
                onChange={handleToDateChange}
                dateFormat={"dd/MM/yyyy"}
                placeholderText='To'
                min
            />
        );
    };

    const handleReportChange = (e) => {
        setReport(e.target.value);
    };
    const handleVariableChange = (e) => {
        setVariable(e.target.value);
    };

    const handleSensorChange = (e) => {
        setSensor(e.target.value);
        setSensorSelected(e.target.value);
    }

    return (
        <>
            <Container>
                <Row>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Reporte Personalizado</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row style={{ width: 600 }}>
                                <Col>
                                    <Form className={` ${styles['form']} `}>
                                        <div>
                                            <label className={styles['text']}>From:</label>
                                            {FromDatePicker()}
                                        </div>
                                        <div>
                                            <label className={styles['text']} >To:</label>
                                            {ToDatePicker()}
                                        </div>
                                        <div>
                                            <label className={styles['text']}>Sensor:</label>
                                            <select value={sensor} onChange={handleSensorChange} className={styles['select']}>
                                                {sensorId.map((sensor, key) => (<option key={key} value={sensor}>{sensor}</option>))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={styles['text']}>Tipo de Reporte:</label>
                                            <select value={report} onChange={handleReportChange} className={styles['select']}>
                                                <option value="1">Diagrama de barras</option>
                                                <option value="2">Diagrama de pie</option>
                                                <option value="3">Diagrama de lineas</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={styles['text']}>Variable:</label>
                                            <select value={variable} onChange={handleVariableChange} className={styles['select']}>
                                                <option value="1">PM2.5</option>
                                                <option value="2">PM10</option>
                                                <option value="3">CO2 </option>
                                                <option value="4">Temperature</option>
                                                <option value="5">Humidity</option>
                                            </select>

                                        </div>
                                        <div className={`${styles['button-div']}`}>
                                            <div >

                                                <button className={` ${projectStyles['button']} `} onClick={openPopup} type='button'>
                                                    Generar Reporte
                                                </button>{isPopupOpen &&
                                                    <PopupPage isOpen={isPopupOpen} OnClose={closePopup} sensor={sensorSelected} reporte={report}
                                                        variable={variable} dateFrom={selectedFromDate} dateTo={selectedToDate} />}
                                            </div>
                                            <div>
                                                <button
                                                    type='button'
                                                    to="/home"
                                                    className={` ${styles['navlink']} ${projectStyles['button']} `}
                                                    onClick={(e) => backHome(e)}
                                                >
                                                    Volver
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

function PopupPage({ isOpen, OnClose, sensor, reporte, variable, dateFrom, dateTo }) {
    const [title, settitle] = useState("");
    const [htmldiagram, sethtmldiagram] = useState("");
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    useEffect(() => {
        if (isOpen)
            selectorDiagrama()
    }, [isOpen]);

    async function selectorDiagrama() {
        switch (reporte) {
            case "1":
                settitle("Diagrama de barras");
                let algo = await getBarrasDiagrama(sensor, variable, dateFrom, dateTo)
                console.log("await getBarrasDiagrama(sensor, variable, dateFrom, dateTo)",algo)
                sethtmldiagram(algo);
                break;
            case "2":
                settitle("Diagrama de pie");
                sethtmldiagram(await getPieDiagrama(sensor, variable, dateFrom, dateTo));
                break;
            case "3":
                settitle("Diagrama de lineas");
                sethtmldiagram(await getLineasDiagrama(sensor, variable, dateFrom, dateTo));
                break;

        }
    };

    async function getBarrasDiagrama(sensor, variable, dateFrom, dateTo) {
        let dataChart = [];
        let labels = [];
        var result = [];
        let datapoints = [];
        switch (variable) {
            case "1":

                result = await getBarrasPM25Data(sensor, dateFrom, dateTo, 1);
                result.forEach(element => {
                    var data = { label: element.variable, y: element.values }
                    datapoints.push(data)

                });
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break
            case "2":
                result = await getBarrasPM10Data(sensor, dateFrom, dateTo, 2);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "3":
                result = await getBarrasCO2Data(sensor, dateFrom, dateTo, 3);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "4":
                result = await getBarrasTemperatureData(sensor, dateFrom, dateTo, 4);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break


            case "5":
                result = await getBarrasHumidityData(sensor, dateFrom, dateTo, 5);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

        }

        return (
            <div>
                <CanvasJSChart options={{
                    title: {
                        text: "Basic Column Chart"
                    },
                    data: [
                        {
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            dataPoints: [
                                { label: "Apple", y: 10 },
                                { label: "Orange", y: 15 },
                                { label: "Banana", y: 25 },
                                { label: "Mango", y: 30 },
                                { label: "Grape", y: 28 }
                            ]
                        }
                    ]
                }}
                /* onRef={ref => this.chart = ref} */
                />
            </div>

        );
    };
    async function getPieDiagrama(sensor, variable, dateFrom, dateTo) {
        let dataChart = [];
        let labels = [];
        var result = [];
        switch (variable) {
            case "1":
                result = await getPiePM25Data(sensor, dateFrom, dateTo, 1);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "2":
                result = await getPiePM10Data(sensor, dateFrom, dateTo, 2);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "3":
                result = await getPieCO2Data(sensor, dateFrom, dateTo, 3);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "4":
                result = await getPieTemperatureData(sensor, dateFrom, dateTo, 4);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "5":
                result = await getPieHumidityData(sensor, dateFrom, dateTo, 5);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break


        }
        return (
            <div
                className="ct-chart ct-perfect-fourth"
                id="chartActivityPie">
                <ChartistGraph
                    data={{
                        labels: labels,
                        series: dataChart,
                    }}
                    type="Pie"
                />
            </div>);
    };
    async function getLineasDiagrama(sensor, variable, dateFrom, dateTo) {
        let dataChart = [];
        let labels = [];
        var result = [];
        switch (variable) {
            case "1":
                result = await getLinePM25Data(sensor, dateFrom, dateTo, 1);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "2":
                result = await getLinePM10Data(sensor, dateFrom, dateTo, 2);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "3":
                result = await getLineCO2Data(dateFrom, dateTo, 3);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "4":
                result = await getLineTemperatureData(dateFrom, dateTo, 4);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

            case "5":
                result = await getLineHumidityData(dateFrom, dateTo, 5);
                dataChart = result.map(eachResult => eachResult.values);
                labels = result.map(eachResult => eachResult.variable);
                break

        }
        return (
            <div className="ct-chart" id="chartActivityLineas">
                <ChartistGraph
                    data={{
                        labels: labels,
                        series: [dataChart],
                    }}
                    type="Line"
                    options={{
                        low: 0,
                        high: 800,
                        showArea: false,
                        height: "300px",

                        axisX: {
                            showGrid: true,
                        },
                        lineSmooth: true,
                        showLine: true,
                        showPoint: true,
                        fullWidth: true,
                        chartPadding: {
                            right: 50,
                        },
                    }}
                    responsiveOptions={[
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function (value) {
                                        return value[0];
                                    },
                                },
                            },
                        ],
                    ]}
                />
            </div>
        );
    };

    return (
        <Modal style={{ paddingLeft: 100 }} isOpen={isOpen}>
            <Row className={styles['containerModal']}>
                <Col style={{ paddingLeft: 60 }}>
                    <Card style={{ padding: 40 }}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <CardTitle>
                                        <div >
                                            <h1  >{title}</h1>
                                        </div>
                                    </CardTitle>
                                </Col>
                            </Row>
                        </Card.Header>
                        <CardBody>
                            <Col>
                                <Row>
                                    <Col>
                                        <div className="ct-chart" id="chartActivityBar">
                                            {htmldiagram}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </CardBody>
                        <Card.Footer style={{ padding: 40, textAlign: 'center' }}  >
                            <Row className="pt-8">
                                <Col>
                                    <button className={` ${projectStyles['button']} `} type='button' onClick={OnClose} >Cerrar</button>
                                </Col>
                                <Col>
                                    {/* <button className={` ${projectStyles['button']} `} type='button' onClick={generatePDF(chartRef)}> Descargar</button>   */}
                                </Col>
                            </Row>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>
        </Modal>
    );
}

export default ReportPage;