import React, { useState, useEffect, useContext } from "react";
import LoadingLogin from "../../components/Animations/LoadingLogin";
import Working from "../../components/Animations/Working";


const divStyle = {
  position: "absolute",
  width: "50%",
  height: "400px",
  backgroundColor: "rgba(0,71,127,0.9)",
  left: 0,
  top: "25%",
  right: 0,
  margin: "auto",
  textAlign: "center",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const ActivateExample = () => {
  
  return (
    <div style={divStyle}>
        <h2 styles={{ fontFamily: "Roboto"}}>Cargando ...</h2>
      <Working />
    </div>
  );
};

export default ActivateExample;