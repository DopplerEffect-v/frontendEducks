import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';

const useStyle = makeStyles({
    card: {
        //CODIGO EN CSS pero que las palabras enves de separadas por -, se ponen en Mayus.
        fontSize: "100%",
        fontFamily: "Roboto",
        fontWeight: "bold",
        backgroundColor: "#F3EEEE",
        borderRadius: "5px",
        border: " 1px solid #BBBBBB",
    },
});

const MenuFiltrosRE = ({ setAllSelected, allSelected }) => {
    const classes = useStyle();

    return (
        <div className={`d-flex justify-content-between container-fluid mx-auto row align-items-center py-2 mb-2 ${classes.card}`}>

            <div className="col-lg-3 col-md-3 col-sm-3 col-3">Codigo</div>
            <div className="col-lg-7 col-md-5 d-none d-sm-none d-md-block d-lg-block">Sumilla</div>
            {/* <div className="col-lg-2 col-md-2 col-sm-3 col-3 text-end px-1">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-3 d-none d-sm-none d-md-block d-lg-block">Todos</div>
                    <div className="col-lg-6">
                        <Checkbox
                            color="default"
                            checked={allSelected}
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={(e) => { setAllSelected(e.target.checked) }}
                        />
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default MenuFiltrosRE;