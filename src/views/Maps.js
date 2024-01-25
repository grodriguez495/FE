import React, { useState, useEffect } from "react";

// react-bootstrap components
import { Badge, Button, Navbar, Nav, Container, Row, Card, Col, Dropdown } from "react-bootstrap";
import { GoogleMap, withScriptjs, withGoogleMap,Marker } from "react-google-maps";
import {urlGetSensorGeographicInformation} from '../endpoints';
import axios from 'axios';


export default function Maps() {

 
  const [sensorId, setSensorId] = useState([]);
  const [longitud, setLongitud] = useState(-74.078020);
  const [latitud, setLatitud] = useState(4.656367);
  const [longitudMarker, setLongitudMarker] = useState();
  const [latitudMarker, setLatitudMarker] = useState();

  function Map() {
    return <GoogleMap defaultZoom={12} defaultCenter={{ lat: latitud , lng: longitud }}>
      <Marker position ={{ lat: latitudMarker , lng: longitudMarker}}/>
    </GoogleMap>
  }
  
  const MapWrapped = withScriptjs(withGoogleMap(Map));

  const getSensorResponse = async () => {
    const { data } = await axios.get(urlGetSensorGeographicInformation);
    setSensorId(data);
   
  }
  useEffect(() => {
    getSensorResponse();
  }, [])

  const handleSelect = (eventKey) => {

    const sensorSeleted =sensorId.filter(x => x.sensorId === eventKey);
    let latitud = sensorSeleted[0].latitud;
    let longitud = sensorSeleted[0].longitud;

    setLatitud(latitud);
    setLongitud(longitud);
    setLatitudMarker(latitud);
    setLongitudMarker(longitud);

  };

  return (
    <>
      <Container fluid>
        <Row>
          <Card>
            <Card.Header>
              <Card.Title as="h4">ubicación de sensores</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>   
                <Col style={{padding:15}} sm="1.5">
                  <Card>
                    <Card.Body>
                      <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle id="dropdown-basic">
                          Sensor
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {
                            sensorId.map(sensor => (<Dropdown.Item key={sensorId}  eventKey={sensor.sensorId}>{sensor.sensorId}</Dropdown.Item>))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div style={{ width: "80vw", height: "90vh" }}>
                <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyClfP_w2OGFwO_hR9GfF-O6_eNriZAqH2A`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );


}



