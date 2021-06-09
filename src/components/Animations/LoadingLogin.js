import React from "react";
import Lottie from "react-lottie";

import * as loadingLogin from "./loadingLogin.json";

 const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingLogin.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}; 

const LoadingLogin = () => {
    return(
        <div>
            <Lottie options={defaultOptions} height={300} width={300} isClickToPauseDisabled={true} style={{cursor: "default"}}/>
        </div>
    )
}

export default LoadingLogin;