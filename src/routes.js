import Dashboard from "views/Dashboard.js";
import PerfilUsuario from "views/PerfilUsuario";
import UserTableList from "views/UsersTableList.js";
import Reports from "views/Reports";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Login from "views/Login.js";
import NewUser from "views/NewUser.js";

const dashboardRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Perfil de Usuario",
    icon: "nc-icon nc-circle-09",
    component: PerfilUsuario,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Tabla de Usuarios",
    icon: "nc-icon nc-notes",
    component: UserTableList,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reportes",
    icon: "nc-icon nc-chart-bar-32",
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bell-55",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/usuarioNuevo",
    name: "Usuario Nuevo",
    icon: "nc-icon nc-bell-55",
    component: NewUser,
    layout: "/admin"
  }
];

export default dashboardRoutes;
