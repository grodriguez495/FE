import React, { useEffect, useState } from 'react'
//import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { urlNewUser, urlGetAvailableRoles } from '../endpoints'
import projectStyles from '../assets/css/style.module.css'
import styles from '../assets/css/new-user.module.css'
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
import { alignPropType } from 'react-bootstrap/esm/types';

const NewUser = (props) => {
  const { history } = props
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    roleId: '',
    phone: ''
  });
  const getResponse = async () => {
    const { data } = await axios.get(urlGetAvailableRoles);
    setRoles(data)
  }
  useEffect(() => {
    getResponse();
  }, [])

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }
  const backHome = () => {
    history.push("/admin/login");
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const ValidateData = () => {

    let errorMessage = {};
    let isValid = true;


    if (!form.name) {
      isValid = false;
      errorMessage.name = "Por favor ingrese el nombre.";
    }
    if (!form.last_name) {
      isValid = false;
      errorMessage.lastName = "Por favor ingrese el apellido.";
    }
    if (!form.email) {
      isValid = false;
      errorMessage.email = "Por favor ingrese el correo.";
    }

    if (typeof form.email !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(form.email)) {
        isValid = false;
        errorMessage.email = "Por favor ingrese un correo valido.";
      }
      var patternDomain = new RegExp(/@unab\.edu\.co/i);
      if (!patternDomain.test(form.email)) {
        isValid = false;
        errorMessage.email = "Por favor ingrese un correo institucional.";
      }
    }

    if (!form.password) {
      isValid = false;
      errorMessage.password = "Por favor ingrese la contraseña.";
    }
    if (!form.phone) {
      isValid = false;
      errorMessage.phone = "Por favor ingrese el numero telefonico.";
    }

    setErrors(errorMessage)
    return isValid;
  }

  async function SaveNewUser(e) {
    e.preventDefault();

    if (ValidateData()) {
      await axios.post(urlNewUser, {
        name: `${form.name} ${form.last_name}`,
        password: form.password,
        email: form.email,
        roleId: role,
        phone: form.phone
      }).then(response => {
        if (response.status === 200) {

          history.push("/admin/login")

        } else {
          alert('El usuario o la password es incorrecta');
        }
      })
        .catch(err => console.log(err));
    }
  }

  return (
    <>
      <Container flex alig>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>

              </Card.Header>
              <Card.Body >

                <Form  >
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>

                        <label>Nombres</label>
                        <Form.Control
                         name="name"
                          placeholder="Nombres"
                          id="InputNombre"
                          className={`${styles['textinput']}  ${projectStyles['input']} ${errors.name ? styles['error'] : ""}`}
                          required
                          type="text"
                          onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Apellidos</label>
                        <Form.Control
                          type="text"
                          required
                          name="last_name"
                          id="inputApellidos"
                          placeholder="Apellidos"
                          className={`${styles['textinput']}  ${projectStyles['input']} ${errors.lastName ? styles['error'] : ""}`}
                          onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Correo</label>
                        <Form.Control
                          required
                          name="email"
                          type="text"
                          id="Correo"
                          placeholder="Correo"
                          className={`${styles['textinput']}  ${projectStyles['input']}  ${errors.email ? styles['error'] : ""}`}
                          onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Contraseña</label>
                        <Form.Control
                          required
                          name="password"
                          type="password"
                          id="inputContraseña"
                          encType="Contraseña"
                          placeholder="Contraseña"
                          className={`${styles['textinput']}  ${projectStyles['input']} ${errors.password ? styles['error'] : ""}`}
                          onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Telefono</label>
                        <Form.Control
                          required
                          name="phone"
                          type="text"
                          id="Telefono"
                          placeholder="Numero telefonico"
                          className={`${styles['textinput']}  ${projectStyles['input']} ${errors.phone ? styles['error'] : ""}`}
                          onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Role</label>
                        <Form.Control
                          as="select"
                          name="roleId"
                          required
                          onChange={handleRoleChange} >
                          <option value="Seleccione un Role">-- seleccione un role</option>
                          {
                            roles.map((role) => (<option value={role.id}>{role.name}</option>))
                          }</Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className=" pr-1 mb-6">
                    <Col></Col>
                    <Col >
                      <button
                        to="/admin/login"
                        id="Guardar"
                        className={` ${projectStyles['button']} `}
                        variant="info"
                        onClick={(e) => SaveNewUser(e)}>
                        Guardar
                      </button>
                    </Col>
                   
                    <Col >
                      <button
                        to="/admin/login"
                        className={` ${projectStyles['button']} `}
                        onClick={(e) => backHome(e)}>
                        Cancelar
                      </button>
                    </Col>
                    <Col></Col>
                  </Row>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewUser
