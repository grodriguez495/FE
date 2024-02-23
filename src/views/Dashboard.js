import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { urlGetSensorIds, urlGetSensorValueBySensor, urlGetActiveNotificationSend, urlDeleteNotification } from '../endpoints';
import styles from '../assets/css/new-user.module.css'
// react-bootstrap components
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
import axios from 'axios';
import { TramRounded } from "@mui/icons-material";

function Dashboard() {
  const [sensorId, setSensorId] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [labels, setLabels] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [totalSensores, setTotalSensores] = useState(null);
  const [userNotification, setUserNotification] = useState([]);
  const [userNotificationTable, setuserNotificationTable] = useState([]);
  const [dropdownSelectedItem, setDropdownSelectedItem] = useState(null);

  const getSensorIdsResponse = async () => {
    const { data } = await axios.get(urlGetSensorIds);
    setTotalSensores(data.length);
    setSensorId(data);
    setDropdownSelectedItem(data[0]);
  }

  async function getUserNotificationResponse() {
    const currentEmail = localStorage.getItem("email");
    const phone = localStorage.getItem("phone")

    const notificationDataResponse = await axios.get(urlGetActiveNotificationSend, {
      params: {
        email: currentEmail,
        phone: phone
      }
    });
    setUserNotification(notificationDataResponse.data);
    setuserNotificationTable(notificationDataResponse.data.splice(0,4));
  }
  useEffect(() => {
    getUserNotificationResponse();
    getSensorIdsResponse();


  }, [])

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    setDropdownSelectedItem(eventKey);
    getChartDataDashboard(eventKey);

  };
  async function getChartDataDashboard(eventKey) {

    const data = await axios.get(urlGetSensorValueBySensor, {
      params: {
        sensor: eventKey
      }
    });

    const labelresponse = data.data.map(x => x.variable)
    const datachartResponse = data.data.map(y => y.values)
    setLabels(labelresponse);
    setDataChart(datachartResponse);
  }
  async function handleNotificationSoftDelete(notificationId) {

    axios.delete(urlDeleteNotification + notificationId)
      .then(response => {

        if (response.status === 200) {
          window.location.reload();

        } else {
          alert('No se encontro la notificacion');
        }
      })
      .catch(err => console.log(err));
  }

  return (

    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="7">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="6">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Numbero de sensores conectados</p>
                      <Card.Title as="h4">{totalSensores}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>

                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="7">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="6">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="9">
                    <div className="numbers">
                      <p className="card-category">Numero de alertas enviadas sin marcar como leidas </p>

                      <Card.Title as="h4">{userNotification.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                
                </div>
              </Card.Footer>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col md="3">
            <Card>
              <Card.Body>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle id="dropdown-basic">
                    {dropdownSelectedItem}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      sensorId.map((option)=>(
                        <Dropdown.Item key={option} eventKey={option} active= {selectedItem === option}>
                          {option}
                        </Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                  {/* <Dropdown.Menu>
                    {
                      sensorId.map((sensor, key) => (<Dropdown.Item key={key} eventKey={sensor} active={selectedItem === key}>{sensor}</Dropdown.Item>))
                    }
                  </Dropdown.Menu> */}
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Variables tomadas del sensor {selectedItem}</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
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
                      height: "245px",
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

                  />
                </div>
              </Card.Body>
              <Card.Footer>

              </Card.Footer>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Variables tomadas del sensor {selectedItem}</Card.Title>

              </Card.Header>
              <Card.Body>
              <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: labels,
                      series:  dataChart,
                    }}
                    type="Pie"
                  />
                </div>    
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Variables tomadas del sensor {selectedItem}</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
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
                      height: "245px",
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
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Variables tomadas del sensor {selectedItem}</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: labels,
                      series: [dataChart],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: true,
                      height: "245px",
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

                  />
                </div>
              </Card.Body>
              <Card.Footer>

              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="7">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Historia de alertas</Card.Title>
                <p className="card-category">Alertas enviadas via correo y SMS</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>

                      {
                        
                        (userNotificationTable).map((notification) => (
                          <tr key={notification.alertId}>

                            <td>
                              {notification.recipient}
                            </td>
                            <td>
                              {notification.message}
                            </td>
                            <td>
                              {notification.alertTypeName}
                            </td>
                            <td>
                              {notification.timestamp}
                            </td>
                            <td className="td-actions text-right">

                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-506045838">Eliminar</Tooltip>
                                }
                              >
                                <Button
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  variant="danger"
                                  onClick={() => handleNotificationSoftDelete(notification.alertId)}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}

                    </tbody>
                  </Table>
                </div>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
