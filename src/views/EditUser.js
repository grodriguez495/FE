import React, { useEffect, useState } from "react";
import axios from 'axios';
import { urlGetUser, urlGetAvailableRoles } from '../endpoints';

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


function PerfilUsuario(state) {
    const [user, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState(0);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newIsActive, setNewIsActive] = useState(false);
   
    const { history } = state

    let userId = 0;
    if (state.location.state == null) {
        userId = localStorage.getItem("userId");
       
    } else {
        userId = state.location.state;
        
    }
    
    const getUsersResponse = async () => {
        let algo = urlGetUser + userId;
        const { data } = await axios.get(algo);
        console.log("data", data)
        setUsers(data);
    }
    const getResponse = async () => {
        const { data } = await axios.get(urlGetAvailableRoles);
        setRoles(data)
    }
    useEffect(() => {
        getUsersResponse();
        getResponse();
    }, [])

    const handleNameChange = (e) => {

        setNewName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value)
    };
    const handlePhoneChange = (e) => {
        setNewPhone(e.target.value)
    };
    const handleIsActiveChange = (e) => {
        setNewIsActive(e.target.value)
    };

    async function SaveNewInfo(e) {
        e.preventDefault();

 
        let url = urlGetUser + userId;
        console.log("algo",url);
        console.log("userId:",userId);
        console.log("newName:", newName);
        console.log("newEmail: ",newEmail);
        console.log("newRole:",newRole);
        console.log("newPhone:",newPhone);
        console.log("newIsActive:",newIsActive);
        let parameters ={
            userId,
            name: newName,
            password: user.password,
            email: newEmail,
            roleId: Number(newRole),
            phone: newPhone,
            isActive: (newIsActive === 'true')
        };
        console.log("parameters",parameters)
        await axios.put(url, parameters).then(response => {
            if (response.status === 200) {

                history.push("/admin/table")
          

            } else {
                alert('El usuario o la password es incorrecta');
            }
        })
            .catch(err => console.log(err));

    }

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
                                                    readOnly
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
                                                    type="text"
                                                    defaultValue={user.name}
                                                    onChange={handleNameChange} />
                                            </Form.Group>

                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Correo
                                                </label>
                                                <Form.Control
                                                    defaultValue={user.email}
                                                    placeholder="Email"
                                                    type="email"
                                                    onChange={handleEmailChange}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Role</label>
                                                <Form.Control
                                                    as="select"
                                                    defaultValue={user.roleId}
                                                    onChange={e => {
                                                        setNewRole(e.target.value);
                                                    }}>
                                                    {
                                                        roles.map((role) => (<option value={user.roleId}>{role.name}</option>))
                                                    }

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Telefono</label>
                                                <Form.Control
                                                    defaultValue={user.phone}
                                                    placeholder="Telefono"
                                                    type="text"
                                                    onChange={handlePhoneChange}

                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Esta Activo</label>
                                                <Form.Control
                                                    as="select"
                                                    defaultValue={user.isActive}
                                                    placeholder="Estado del usuario"
                                                    onChange={handleIsActiveChange}
                                                >
                                                    <option value={true}>Activo</option>
                                                    <option value={false}>Inactivo</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"

                                        variant="info"
                                        onClick={(e) => SaveNewInfo(e)}
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
