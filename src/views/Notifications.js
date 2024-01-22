import React, { useEffect, useState } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { urlGetNotificationSend } from '../endpoints';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown,FaBell } from "react-icons/fa"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function Notifications() {
  const [showModal, setShowModal] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const [userNotification, setUserNotification] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userNotification.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="Primera pagina"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="Pagina Anterior"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Siguiente Pagina"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Ultima Pagina"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  async function getUserNotificationResponse() {
    const currentEmail = localStorage.getItem("email");
    const phone = localStorage.getItem("phone")

    const notificationDataResponse = await axios.get(urlGetNotificationSend, {
      params: {
        email: currentEmail,
        phone: phone
      }
    });
    console.log("notificationDataResponse",notificationDataResponse.data);
    setUserNotification(notificationDataResponse.data);
  }
  useEffect(() => {
    getUserNotificationResponse();


  }, [])
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Notificaciones enviadas</Card.Title>

          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="12">
                <TableContainer component={Paper}>
                  <table sx={{ minWidth: 500 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Fecha </TableCell>
                        <TableCell align="right">Mensaje </TableCell>
                        <TableCell align="right">Destinatario</TableCell>
                        <TableCell align="right">Tipo de alerta</TableCell>
                        <TableCell align="right">Esta Leido</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage >0
                      ? userNotification.slice(page * rowsPerPage,page*rowsPerPage + rowsPerPage)
                      :userNotification).map((notification) => (
                        <TableRow key={notification.alertId}>
                          <TableCell component="th" scope="notification">
                            {notification.alertId}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                          {notification.timestamp}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                          {notification.message}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                          {notification.recipient}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                          {notification.alertTypeName}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                          {notification.isOpened ? <FaBell style={{ color: 'green', size: '50px' }} /> : <FaBell style={{ color: 'red', size: '50px' }} />}
                          </TableCell>
                        </TableRow>
                      ))}{emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={6}
                          count={userNotification.length}
                          rowsPerPage={rowsPerPage}
                          page={page}                       
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </table>
                </TableContainer>

              </Col>

            </Row>
          </Card.Body>
        </Card>
        {/* Mini Modal */}
        <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-bulb-63"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Always have an access to your profile</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Notifications;
