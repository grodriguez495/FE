
/*eslint-disable*/
import React, { Component } from "react";

import { Dropdown, Badge, Button, Form } from "react-bootstrap";
import arbol from "assets/img/arbol.jpg";
import caño_cristales from "assets/img/CAÑO_CRISTALES,_EL_RÍO_DE_COLORES.jpg";
import naturaleza from "assets/img/Naturaleza-es-futuro.jpg";
import rio from "assets/img/rio.jpg";

function FixedPlugin({
  hasImage,
  setHasImage,
  color,
  setColor,
  image,
  setImage
}) {
 
  return (
    <div className="fixed-plugin">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <li className="adjustments-line d-flex align-items-center justify-content-between">
            <p>Background Image</p>
            <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={hasImage}
              onChange={setHasImage}
            />
          </li>
          <li className="header-title">Sidebar Images</li>
          <li className={image === arbol ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(arbol);
              }}
            >
              <img alt="..." src={arbol}></img>
            </a>
          </li>
          <li className={image === caño_cristales ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(caño_cristales);
              }}
            >
              <img alt="..." src={caño_cristales}></img>
            </a>
          </li>
          <li className={image === naturaleza ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(naturaleza);
              }}
            >
              <img alt="..." src={naturaleza}></img>
            </a>
          </li>
          <li className={image === rio ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(rio);
              }}
            >
              <img alt="..." src={rio}></img>
            </a>
          </li>

        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
