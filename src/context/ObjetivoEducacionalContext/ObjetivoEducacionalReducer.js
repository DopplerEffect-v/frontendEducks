import {
    FETCH_OBJETIVOS_EDUCACIONALES,
    FETCH_OBJETIVO_EDUCACIONAL,
    CLEAN_OBJETIVO_EDUCACIONAL,
    BUSCAR_OBJETIVOS_EDUCACIONALES,
} from "./ObjetivoEducacionalTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_OBJETIVOS_EDUCACIONALES:
            return {
                ...state,
                objetivosEducacionales: payload,
            };
        case FETCH_OBJETIVO_EDUCACIONAL:
            return {
                ...state,
                objetivoEducacional: payload,
            };
        case CLEAN_OBJETIVO_EDUCACIONAL:
            return {
                ...state,
                objetivoEducacional: payload,
            };
        case BUSCAR_OBJETIVOS_EDUCACIONALES:
            return {
                ...state,
                objetivosEducacionales: payload,
            };

        default:
            return state;
    }
};
