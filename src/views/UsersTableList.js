import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import projectStyles from '../assets/css/style.module.css';
import styles from '../assets/css/users-dashborad.module.css';
import { urlGetAvailableUsers, urlPutEditUSer, urlDeleteUSer } from '../endpoints';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';
import { SlOptionsVertical } from "react-icons/sl";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { Button, Menu, MenuItem } from '@mui/material';
// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function BasicMenu(props) {
  const { user, history } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    roleId: '',
    phone: ''
  });

  async function handleEdit(user) {
    console.log(user)
    history.push({
      pathname: '/edit-user',
      state: user.userId,
    });

  }
  const handleSoftDelete = (user) => {

    axios.delete(urlDeleteUSer + user.userId)
      .then(response => {

        console.log(response);
        if (response.status === 200) {

          history.push("/users-dashboard")

        } else {
          alert('No se encontro el usuario');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleEdit(user)}>Editar</MenuItem>
        <MenuItem onClick={() => handleSoftDelete(user)}>InActivar</MenuItem>
      </Menu>
    </div>
  );
}

function UserTableList(props) {

  const { history } = props
  const [users, setUsers] = useState([]);

  const getUsersResponse = async () => {
    const { data } = await axios.get(urlGetAvailableUsers);
    setUsers(data);
  }

  useEffect(() => {
    getUsersResponse();
  }, [])

  const returnDashboard = (e) => {
    history.push("/dashboard");
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

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


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Usuarios Registrados en el sistema</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} >
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Nombres</TableCell>
                        <TableCell align="right">Correo </TableCell>
                        <TableCell align="right">Role </TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Active</TableCell>
                        <TableCell align="right">Opciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                      ).map((user) => (
                        <TableRow key={user.name}>
                          <TableCell component="th" scope="user">
                            {user.userId}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {user.name}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {user.email}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {user.roleName}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {user.phone}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {user.isActive ? <FaThumbsUp style={{ color: 'green', size: '50px' }} /> : <FaThumbsDown style={{ color: 'red', size: '50px' }} />}
                          </TableCell>
                          <TableCell align="right">
                            <BasicMenu user={user} history={history} />
                          </TableCell>
                        </TableRow>
                      ))} {emptyRows > 0 && (
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
                          count={users.length}
                          rowsPerPage={rowsPerPage}
                          page={page}                       
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserTableList;
