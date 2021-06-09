import React from "react";
import Lottie from "react-lottie";

import * as lock from "./lock.json";

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: lock.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Lock = () => {
    return(
        <div>
            <Lottie options={defaultOptions} height={35} width={35}/>
        </div>
    )
}

export default Lock;