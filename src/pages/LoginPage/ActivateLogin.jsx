import React, { useState, useEffect, useContext } from "react";
import LoadingLogin from "../../components/Animations/LoadingLogin";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import instance from "../../instance";

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
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white"
};

const ActivateLogin = ({ match }) => {
  const [loading, setLoading] = useState(undefined);

  const { loadUser } = useContext(AuthContext);
  const history = useHistory();

  const Token = match.params.token;

  const [current, setCurrent] = useState(undefined);

  instance.setItem("ishara", { token: Token });

  useEffect(() => {
    //funcion
    console.log(Token);
    waitLoadUser();
  }, []);

  useEffect(() => {
    if (loading == false) {
      console.log(current);
      if (!current) return;

      switch (current.idRol) {
        case 1:
          history.push("/gestionarProgramas");
          break;
        case 2:
          history.push({
            pathname: "/gestionarAsistentes",
          });
          break;
        case 3:
          history.push("/gestionarFacultades");
          break;
        case 4:
          history.push("/");
        case 5:
          history.push("gestionarAsistentes");
        default:
          return history.push("/");
      }
    }
  }, [loading]);

  const waitLoadUser = () => {

    setLoading(undefined);
    setTimeout(() => {
      loadUser().then((response) => {
        setCurrent(instance.getItem("sasaGurudumu"));
        //console.log(current);
      });
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 1000);
    }, 1000);

  };

  return (
    <div style={divStyle}>
        <h1 styles={{ fontFamily: "Roboto", marginRight: "5%"}}>Validando Usuario</h1>
      <LoadingLogin />
    </div>
  );
};

export default ActivateLogin;
