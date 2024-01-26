import React, { useEffect, useState } from 'react'
//import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { urlNewUser, urlGetAvailableRoles } from '../endpoints'
import projectStyles from '../assets/css/style.module.css'
import styles from '../assets/css/new-user.module.css'

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
    <div className={styles['container']}>
      
      <form onSubmit={ValidateData} className={styles['form']}>
        <label id="Nombres" className={styles['text1']}>
          Nombres
        </label>
        <input
          required
          name="name"
          type="text"
          id="InputNombre"
          placeholder="Nombres"
          className={` ${styles['textinput']} ${projectStyles['input']}  ${errors.name ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <label id="Apellidos" className={styles['text2']}>
          Apellidos
        </label>
        <input
          required
          name="last_name"
          type="text"
          id="inputApellidos"
          placeholder="Apellidos"
          className={` ${styles['textinput1']} ${projectStyles['input']} ${errors.lastName ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <label id="Correo" className={styles['text3']}>
          Correo
        </label>
        <input
          required
          name="email"
          type="text"
          id="Correo"
          placeholder="Correo"
          className={` ${styles['textinput2']} ${projectStyles['input']} ${errors.email ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <label id="Contraseña" className={styles['text4']}>
          Contraseña
        </label>
        <input
          required
          name="password"
          type="text"
          id="inputContraseña"
          encType="Contraseña"
          placeholder="Contraseña"
          className={` ${styles['textinput4']} ${projectStyles['input']} ${errors.password ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <label className={styles['text5']}>Telefono</label>
        <input
          required
          name="phone"
          type="text"
          id="Telefono"
          placeholder="Numero telefonico"
          className={` ${styles['textinput3']} ${projectStyles['input']} ${errors.phone ? styles['error'] : ""}`}
          onChange={handleChange}
        />
        <span className={styles['text6']}>Role</span>
        <select
          name="roleId"
          required
          className={styles['select']}
          onChange={handleRoleChange}
        >
          <option value="Seleccione un Role">-- seleccione un role</option>
          {
            roles.map((role) => (<option value={role.id}>{role.name}</option>))
          }
        </select>

        <button
          to="/login"
          id="Guardar"
          className={` ${styles['navlink']} ${projectStyles['button']} `}
          onClick={(e) => SaveNewUser(e)}
        >
          Guardar
        </button>
        <button
          to="/login"
          className={` ${styles['navlink1']} ${projectStyles['button']} `}
          onClick={(e) => backHome(e)}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default NewUser