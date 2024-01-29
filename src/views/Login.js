import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/login.module.css'
import { Link } from 'react-router-dom'
import projectStyles from '../assets/css/style.module.css'
import styles from '../assets/css/login.module.css'
import axios from 'axios';
import { urlLogin } from '../endpoints'
import Cookies from "universal-cookie";
import { withRouter } from 'react-router-dom';


function Login(props) {
  const { history } = props
  const cookies = new Cookies();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  async function logginSesion(e) {
   
    e.preventDefault()
    localStorage.clear();
    if (ValidateData()) {
      await axios.post(
        urlLogin, {
        email: form.email,
        password: form.password
      })
        .then(response => {
          if (response.status === 200) {
            var respuesta = response.data;
            localStorage.setItem("userId", respuesta.userId);
            localStorage.setItem("roleId", respuesta.roleId);
            localStorage.setItem("email", respuesta.email)
            localStorage.setItem("phone", respuesta.phone)
            history.push("/admin/dashboard")
          } else {
            alert('El usuario o la password es incorrecta');
          }
        })
        .catch(err => console.log(err));
    }

  }

  const cancelSesion = (e) => {
    form.email = " ";
    form.password = " ";
    history.push("/admin/login");
  }

  const ValidateData = () => {

    let errorMessage = {};
    let isValid = true;
    if (typeof form.email !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(form.email)) {
        isValid = false;
        errorMessage.email = "Por favor ingrese un correo valido.";
      }
    }
    if (!form.password) {
      isValid = false;
      errorMessage.password = "Por favor ingrese la contraseña.";
    }
    setErrors(errorMessage)
    return isValid;
  }
  return (
    <div id="login" className={styles['container']}>
      <h1 className={styles['text3']}>Login</h1>
      <form id="Ingresar" onSubmit={ValidateData} className={styles['form']}>
        <input
          required
          name="email"
          type="text"
          id="Email"
          placeholder="Correo"
          className={` ${styles['textinput']} ${projectStyles['input']} ${errors.email ? styles['error'] : ""} `}
          onChange={handleChange}
        />
        <label className={styles['text']}>Email:</label>
        <label className={styles['text1']}>password:</label>
        <input
          required
          name="password"
          type="password"
          id="password"
          placeholder="Contraseña"
          className={` ${styles['textinput1']} ${projectStyles['input']} ${errors.password ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <Link to="/admin/usuarioNuevo" id="registrar" className={styles['navlink']}>
          ¿No tienes usuario?
        </Link>
        <span>No tienes usuario</span>
        <button className={` ${styles['navlink1']} ${projectStyles['button']} `}   href="/admin/dashboard" onClick={(e) => logginSesion(e)}>Ingresar</button>
        <button className={` ${styles['navlink2']} ${projectStyles['button']}`} href="/admin/login" onClick={(e) => cancelSesion(e)}>Cancelar</button>

      </form>
    </div>
  )
}

export default Login
