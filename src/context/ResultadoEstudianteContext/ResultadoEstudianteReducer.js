import {
    FETCH_RESULTADOS_ESTUDIANTE,
    FETCH_RESULTADO_ESTUDIANTE,
} from "./ResultadoEstudianteTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_RESULTADOS_ESTUDIANTE:
            return {
                ...state,
                resultadosEstudiante: payload,
            };
        case FETCH_RESULTADO_ESTUDIANTE:
            return {
                ...state,
                resultadoEstudiante: payload,
            };
        default:
            return state;
    }
};
