// import React, { useEffect, useState } from 'react'
// import styles from '../assets/css/reportes.module.css'
// import projectStyles from '../assets/css/style.module.css'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'
// import "react-datepicker/dist/react-datepicker.css"
// import Modal from 'react-modal';
// import { getBarrasCO2Data, getBarrasHumidityData, getBarrasPM10Data, getBarrasPM25Data, getBarrasTemperatureData, getLineCO2Data, getLineHumidityData, getLinePM10Data, getLinePM25Data, getLineTemperatureData, getPieCO2Data, getPieHumidityData, getPiePM10Data, getPiePM25Data, getPieTemperatureData } from './Calculation'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   RadialLinearScale,
//   BarElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement,
//   Filler,
// } from 'chart.js';
// import { Bar, Pie, Line, Chart, } from 'react-chartjs-2'
// import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Navbar,
//   Nav,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";

// function Reports(props) {

//   const { history } = props
//   const [sensorValues, setSensorValues] = useState([]);
//   const [sensorValuesByDatesAndVariable, setSensorValuesByDatesAndVariable] = useState([]);
//   const [selectedFromDate, setSelectedFromDate] = useState(null);
//   const [selectedToDate, setSelectedToDate] = useState(null);
//   const [report, setReport] = useState("1");
//   const [variable, setVariable] = useState("1");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleReportChange = (e) => {
//     setReport(e.target.value);
//   }


//   const FromDatePicker = () => {
//     const handleFromDateChange = (date) => {
//       setSelectedFromDate(date);
//     }
//     return (
//       <DatePicker 
//         selected={selectedFromDate}
//         onChange={handleFromDateChange}
//         dateFormat={"dd/MM/yyyy"}
//         placeholderText='From'
//       />
//     );

//   };

//   const ToDatePicker = () => {
//     const handleToDateChange = (date) => {
//       setSelectedToDate(date);
//     }
//     return (
//       <DatePicker
//         selected={selectedToDate}
//         onChange={handleToDateChange}
//         dateFormat={"dd/MM/yyyy"}
//         placeholderText='To'
//         min
//       />
//     );
//   };
//   const handleVariableChange = (e) => {
//     setVariable(e.target.value);
//   };

//   return (
//     <>
//       <Container >
//         <Row>
//           <Col >
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Reporte personalizado </Card.Title>
                
//               </Card.Header>
//               <Card.Body >
//                 <Row>
//                   <Col >
//                     <form className={` ${styles['form']} `}>
//                       <div>

//                         <label className={styles['text']}>From:</label>
//                         {FromDatePicker()}

//                       </div>
//                       <div>
//                         <label className={styles['text']}>To:</label>
//                         {ToDatePicker()}
//                       </div>
//                       <div>
//                         <label className={styles['text']}>Tipo de Reporte:</label>
//                         <select value={report} onChange={handleReportChange} className={styles['select']}>
//                           <option value="1">Diagrama de barras</option>
//                           <option value="2">Diagrama de pie</option>
//                           <option value="3">Diagrama de lineas</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className={styles['text']}>Variable:</label>
//                         <select value={variable} onChange={handleVariableChange} className={styles['select']}>
//                           <option value="1">PM2.5</option>
//                           <option value="2">PM10</option>
//                           <option value="3">CO2 </option>
//                           <option value="4">Temperature</option>
//                           <option value="5">Humidity</option>
//                         </select>

//                       </div>
//                       <div className={`${styles['button-div']}`}>
//                         <div >

//                           <button className={` ${projectStyles['button']} `} onClick={openPopup} type='button'>
//                             Generar Reporte
//                           </button>{isPopupOpen &&
//                             <PopupPage isOpen={isPopupOpen} OnClose={closePopup} reporte={report} variable={variable} dateFrom={selectedFromDate} dateTo={selectedToDate} />}
//                         </div>
//                         <div>
//                           <button
//                             type='button'
//                             to="/home"
//                             className={` ${styles['navlink']} ${projectStyles['button']} `}
//                             onClick={(e) => backHome(e)}
//                           >
//                             Volver
//                           </button>
//                         </div>
//                       </div>
//                     </form>
//                   </Col>

//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// function PopupPage({ isOpen, OnClose, reporte, variable, dateFrom, dateTo }) {


//   const data = {};
//   const options = {};
//   const [htmldiagram, sethtmldiagram] = useState("");
//   const [title, settitle] = useState("");
//   const getBarrasOptions = {
//       responsive: true,
//       plugins: {
//           legend: {
//               position: 'top',
//           },
//           title: {

//           },
//       },
//   };
//   const getLineOptions = {
//       responsive: true,
//       interaction: {
//           mode: 'index',
//           intersect: false,
//       },
//       stacked: false,
//       plugins: {

//       },
//       scales: {
//           y: {
//               type: 'linear',
//               display: true,
//               position: 'left',
//           },
//           y1: {
//               type: 'linear',
//               display: true,
//               position: 'right',
//               grid: {
//                   drawOnChartArea: false,
//               },
//           },
//       }
//   }

//   useEffect(() => {
//       if (isOpen)
//           selectorDiagrama()
//   }, [isOpen])

//   async function selectorDiagrama() {
//       switch (reporte) {
//           case "1":
//               settitle("Diagrama de barras");
//               sethtmldiagram(await getBarrasDiagrama(variable, dateFrom, dateTo));
//               break;
//           case "2":
//               settitle("Diagrama de pie");
//               sethtmldiagram(await getPieDiagrama(variable, dateFrom, dateTo));
//               break;
//           case "3":
//               settitle("Diagrama de lineas");
//               sethtmldiagram(await getLineasDiagrama(variable, dateFrom, dateTo));
//               break;

//       }
//   }
//   async function getBarrasDiagrama(variable, dateFrom, dateTo) {
//       let data = [];
//       switch (variable) {
//           case "1":
//               data = await getBarrasPM25Data(dateFrom, dateTo, 1);
//               break
//           case "2":
//               data = await getBarrasPM10Data(dateFrom, dateTo, 2);
//               break

//           case "3":
//               data = await getBarrasCO2Data(dateFrom, dateTo, 3);
//               break

//           case "4":
//               data = await getBarrasTemperatureData(dateFrom, dateTo, 4);
//               break


//           case "5":
//               data = await getBarrasHumidityData(dateFrom, dateTo, 5);
//               break

//       }
//       return (<Bar
//           data={data}
//           options={getBarrasOptions}></Bar>);
//   }

//   async function getPieDiagrama(variable, dateFrom, dateTo) {
//       let data = [];
//       switch (variable) {
//           case "1":
//               data = await getPiePM25Data(dateFrom, dateTo, 1);
//               break

//           case "2":
//               data = await getPiePM10Data(dateFrom, dateTo, 2);
//               break

//           case "3":
//               data = await getPieCO2Data(dateFrom, dateTo, 3);
//               break

//           case "4":
//               data = await getPieTemperatureData(dateFrom, dateTo, 4);
//               break

//           case "5":
//               data = await getPieHumidityData(dateFrom, dateTo, 5);
//               break


//       }
//       return (<Pie data={data}></Pie>);
//   };

//   async function getLineasDiagrama(variable, dateFrom, dateTo) {
//       let data = [];
//       switch (variable) {
//           case "1":
//               data = await getLinePM25Data(dateFrom, dateTo, 1);
//               break

//           case "2":
//               data = await getLinePM10Data(dateFrom, dateTo, 2);
//               break

//           case "3":
//               data = await getLineCO2Data(dateFrom, dateTo, 3);
//               break

//           case "4":
//               data = await getLineTemperatureData(dateFrom, dateTo, 4);
//               break

//           case "5":
//               data = await getLineHumidityData(dateFrom, dateTo, 5);
//               break

//       }
//       return (<Line
//           data={data}
//           options={getBarrasOptions}></Line>);
//   }

//   return (
//       <Modal isOpen={isOpen} report={reporte} >
//           <div className={styles['containerModal']}>

//               <div className={styles['divTitle']}>
//                   <h1 className={styles['title']}>{title}</h1>
//               </div>
//               <div>
//                   {htmldiagram}
//               </div>
//               <div className={styles['divButtons']}>

//                   <button className={` ${projectStyles['button']} `} type='button' onClick={OnClose} >close</button>
//                   <div>{
//                       htmldiagram &&
//                       <PDFDownloadLink document={<MyDocument htmldiagram={htmldiagram} />} fileName="example.pdf">
//                           {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
//                       </PDFDownloadLink>
//                   }
//                   </div>
//               </div>
//           </div>
//       </Modal>
//   );
// };

// function DownloadChart(htmldiagram) {
//   return (
//       <Document>
//           <Page>
//               <View>
//                   asdf
//                   {htmldiagram}
//               </View>
//           </Page>
//       </Document>);


// }
// const styles1 = StyleSheet.create({
//   page: {
//       flexDirection: 'row',
//       backgroundColor: '#E4E4E4'
//   },
//   section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//   }
// });

// const MyDocument = ({ htmldiagram }) => (

//   <Document>
//       <Page size="A4" style={styles1.page}>
//           <View style={styles1.section}>
//               <Text>Chart Exported to PDF</Text>
//               {htmldiagram}
//           </View>
//       </Page>
//   </Document>
// );
// const MyDocumentoriginal = ({ htmldiagram }) => (

//   <Document>
//       <Page size="A4" style={styles1.page}>
//           <View style={styles1.section}>
//               {htmldiagram}
//           </View>
//       </Page>
//   </Document>
// );

// export default Reports;
