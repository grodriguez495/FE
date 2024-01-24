import React, { useEffect, useState } from "react";
import axios from 'axios';
import { urlGetUser } from '../endpoints';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function PerfilUsuario() {
  const [user, setUsers] = useState([]);
  let currentUserId = localStorage.getItem("userId");

  const getUsersResponse = async () => {
    let algo = urlGetUser + currentUserId;  
    const { data } = await axios.get(algo);
    setUsers(data);
  }
  useEffect(() => {
    getUsersResponse();
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Editar Perfil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>User Id</label>
                        <Form.Control
                        disabled
                          value={user.userId}
                          placeholder="Id del Usuario"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Nombres</label>
                        <Form.Control
                           value={user.name}
                          placeholder="Nombre"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Correo
                        </label>
                        <Form.Control
                         value={user.email}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                    <Form.Group>
                        <label>Role</label>
                        <Form.Control
                           value={user.roleName}
                          placeholder="Telefono"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                      <Form.Group>
                        <label>Telefono</label>
                        <Form.Control
                           value={user.phone}
                          placeholder="Telefono"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <label>Esta Activo</label>
                        <Form.Control
                           value={user.isActive}
                          placeholder="Estado del usuario"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PerfilUsuario;
