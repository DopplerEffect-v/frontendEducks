import React from "react";
import Lottie from "react-lottie";

import * as duck from "./loadingDuck.json";
import "../../pages/LoginPage/ActivateStyles.css"
const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: duck.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Loading = () => {
    return(
        <div>
            <Lottie id="pato" options={defaultOptions} height={500} width={500} isClickToPauseDisabled={true}/>
        </div>
    )
}

export default Loading;