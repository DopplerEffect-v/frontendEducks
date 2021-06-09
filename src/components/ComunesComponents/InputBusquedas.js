import React from "react";

const InputBusquedas = ({ placeHolder_Default, handleKeyPress, onChange }) => {
    return (
        <div className="justify-content-start">
            <input
                type="text"
                className="form-control"
                style={{ borderRadius: "15px" }}
                placeholder={placeHolder_Default}
                id="inputBusqueda"
                name="title"
                //onKeyPress={handleKeyPress}
                //onChange={}
                //value={}
                onChange={(e) => {
                    //handleKeyPress(e);
                    onChange(e.target.value);
                }}
            />
        </div>
    );
};

export default InputBusquedas;
