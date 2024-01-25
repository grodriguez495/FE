import React, { useState } from "react";

// react-bootstrap components
import { Badge, Button, Navbar, Nav, Container, Row, Card, Col, Dropdown } from "react-bootstrap";
import credentials from "credentials";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 4.509003, lng: -74.103069 }} />
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default function Maps() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [sensorId, setSensorId] = useState([]);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
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
                            sensorId.map((sensor, key) => (<Dropdown.Item key={key} eventKey={sensor}>{sensor}</Dropdown.Item>))
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

