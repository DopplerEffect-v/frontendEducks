import React from "react";
import Lottie from "react-lottie";

import * as working from "./working.json";

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: working.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Working = () => {
    return(
        <div>
            <Lottie options={defaultOptions} height={300} width={300} isClickToPauseDisabled={true}/>
        </div>
    )
}

export default Working;