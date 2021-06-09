import React from "react";
import Lottie from "react-lottie";

import * as question from "./question.json";

const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: question.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Question = () => {
    return(
        <div>
            <Lottie options={defaultOptions} height={120} width={120} isClickToPauseDisabled={true} style={{cursor: "default"}}/>
        </div>
    )
}

export default Question;