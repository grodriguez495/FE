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

function ReportPage() {

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



    useEffect(() => {
        if (isOpen)
            selectorDiagrama()
    }, [isOpen]);

    async function selectorDiagrama() {
        switch (reporte) {
            case "1":
                settitle("Diagrama de barras");
                sethtmldiagram(await getBarrasDiagrama(sensor, variable, dateFrom, dateTo));
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
        switch (variable) {
            case "1":

                result = await getBarrasPM25Data(sensor, dateFrom, dateTo, 1);
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


            <ChartistGraph
                data={{
                    labels: labels,
                    series: [dataChart],
                }}
                type="Bar"
                options={{
                    seriesBarDistance: 10,
                    axisX: {
                        showGrid: true,
                    },
                    height: "300px",
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
                                <Row>

                                    <Col>
                                        <button className={` ${projectStyles['button']} `} type='button' onClick={OnClose} >Cerrar</button>
                                    </Col>
                                    <Col>
                                        {/*<button className={` ${projectStyles['button']} `} type='button' onClick={() => MyDocument(htmldiagram)}> Descargar</button>
                                         <PDFDownloadLink document={<MyDocument htmldiagram={htmldiagram} />} fileName="example.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                                        </PDFDownloadLink> */}
                                    </Col>
                                </Row>
                            </Col>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
}
// const styles1 = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });


// async function MyDocument  ( htmldiagram )  {
// <div>
//     <PDFViewer width="1000" height="600">
//         <iframe title='PDF Viewer' width="100%" height="100%" src={pdfBlobUrl(htmldiagram)}/>
//     </PDFViewer>
// </div>
    
// };

// const pdfBlobUrl = URL.createObjectURL(htmldiagram)(
//     new Blob([
//         <Document>
//             <Page size="A4" style={styles1.page}>
//                 <View style={styles1.section}>
//                     <Text>Chart Exported to PDF</Text>
//                     {htmldiagram}
//                 </View>
//             </Page>
//         </Document>
//     ])
// );

// async function DownloadFuntion(htmldiagram){
// console.log("llego",htmldiagram);
// //className="ct-chart" id="chartActivityBar"
// const algoClass = htmldiagram.props.className;
// const doc = new jsPDF("p", "px");
// const elements = document.getElementsByClassName(algoClass); // (2)

//   await creatPdf({ doc, elements }); // (3-5)

//   doc.save(`charts.pdf`); 
// }
// async function creatPdf({
//     doc,
//     elements,
//   }) {
//     const padding = 10;
//     const marginTop = 20;
//     let top = marginTop;

//     const el = elements;
//     const imgData = await htmlToImage.toPng(el[0]);
//     let elHeight = el.offsetHeight;
//     let elWidth = el.offsetWidth;

//     const pageWidth = doc.internal.pageSize.getWidth();

//     if (elWidth > pageWidth) {
//       const ratio = pageWidth / elWidth;
//       elHeight = elHeight * ratio - padding * 2;
//       elWidth = elWidth * ratio - padding * 2;
//     }

//     const pageHeight = doc.internal.pageSize.getHeight();

//     if (top + elHeight > pageHeight) {
//       doc.addPage();
//       top = marginTop;
//     }
//     doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image`);
//     top += elHeight + marginTop;
//   }

export default ReportPage;

