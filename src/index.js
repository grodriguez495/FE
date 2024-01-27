
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import { ProtectedRoute } from 'layouts/ProtectedRoute';
import Dashboard from 'views/Dashboard';
import Login from 'views/Login';
import routes from "routes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getRoutes = (routes) => {


  return routes.map((prop, key) => {
    if (prop.layout === "/admin") {
      return (
        <Route
          path={prop.layout + prop.path}
          render={(props) => <prop.component {...props} />}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />}>
        {
        getRoutes(routes)
        }
        {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
        <Route path ="/" element={<Dashboard/>}/>
      </Route>
      <Route path ="/admin/login" element={<Login/>}/>
    </Routes>


  </BrowserRouter>
);

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/sign-up" element={<SignUp />} />
//       <Route path="/sign-in" element={<SignIn />} />
//       <Route element={<ProtectedRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/profile" element={<UserProfile />} />
//         {/* Handle other routes */}
//       </Route>
//     </Routes>
//   );
// };