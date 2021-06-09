import {
    FETCH_PROGRAMA_MEDICION,
    FETCH_PROGRAMAS_MEDICION,
    FETCH_NO_RESULTADO_ESTUDIANTE_MEDICION,
} from "./ProgramaMedicionTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_PROGRAMAS_MEDICION:
            return {
                ...state,
                resultadosMedicion: payload,
            };
        case FETCH_PROGRAMA_MEDICION:
            return {
                ...state,
                resultadoMedicion: payload,
            };
        case FETCH_NO_RESULTADO_ESTUDIANTE_MEDICION:
            return {
                ...state,
                resultadosNoMedicion: payload,
            };
        default:
            return state;
    }
};
