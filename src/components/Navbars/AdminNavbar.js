
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import routes from "routes.js";
import { urlGetActiveNotificationSendByDate } from '../../endpoints';


function Header() {
  const [userNotification, setUserNotification] = useState([]);
  const [userSmsNotification, setUserSmsNotification] = useState([]);
  const [userEmailNotification, setUserEmailNotification] = useState([]);

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  useEffect(() => {
    getUserNotificationResponse();
  }, [])

  async function getUserNotificationResponse() {
    const currentEmail = localStorage.getItem("email");
    const phone = localStorage.getItem("phone")

    const notificationDataResponse = await axios.get(urlGetActiveNotificationSendByDate, {
      params: {
        email: currentEmail,
        phone: phone
      }
    });
    setUserNotification(notificationDataResponse.data);
    const smsNotifications = notificationDataResponse.data.filter(x => x.alertType === 2);
    const emailNotifications = notificationDataResponse.data.filter(x => x.alertType === 1);
    console.log("notificationDataResponse.data", notificationDataResponse.data)
    console.log("smsNotifications", smsNotifications)
    console.log("emailNotifications", emailNotifications)
    setUserEmailNotification(emailNotifications);
    setUserSmsNotification(smsNotifications);
  }

  const logOutSession = (e) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
  }
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <i className="nc-icon nc-planet"></i>
                <span className="notification"> {userNotification.length}</span>
                <span className="d-lg-none ml-1">Notificaciones por dia</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="/admin/notifications"
                  onClick={(e) => e.preventDefault()}
                >
                  {userSmsNotification.length} Notificaciones SMS
                </Dropdown.Item>
                <Dropdown.Item
                  href="/admin/notifications"
                  onClick={(e) => e.preventDefault()}
                >
                  {userEmailNotification.length}  Notificaciones por correo
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/login"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Ingresar</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/login"
                onClick={(e) => logOutSession(e)}
              >
                <span className="no-icon">Salir</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
