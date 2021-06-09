import React from "react";
import NotFoundImg from "../../assets/images/duckWorking.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  Error_Text: {
    //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
    fontSize: "50px",
    fontFamily: "Roboto",
    color: "#ffd600",
    marginTop: "5%",
    paddingTop: "20px",
  },
  Error_Image: {
    width: theme.spacing(40),
    paddingBottom: "20px",
  },
}));

const NotFound = () => {
  const classes = useStyle();
  return (
    <div className="align-center" style={{ backgroundColor: "black" }}>
      <div className="text-center">
        <h1 className={classes.Error_Text}>Error 404: Page Not Found </h1>
        <h3 className={classes.Error_Text}>
          Patitos are working very hard to fix it{" "}
        </h3>
        <img
          src={NotFoundImg}
          alt="404 NotFound"
          className={classes.Error_Image}
        />
      </div>
    </div>
  );
};

export default NotFound;
