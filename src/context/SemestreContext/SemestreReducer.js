import {
    FETCH_DETALLE_SEMESTRE,
    FETCH_SEMESTRES,
    CLEAN_DETALLE_SEMESTRE,
    CLEAN_SEMESTRES,
} from "./SemestreTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_DETALLE_SEMESTRE:
            return {
                ...state,
                detalleSemestres: payload,
                cicloActual: payload[0].agno +"-"+payload[0].ciclo,
                ultimoProgramado:payload[1].agno +"-"+payload[1].ciclo,
                ultimoAgregado:payload[2].agno +"-"+payload[2].ciclo,
                primerAgregar:payload[3].agno +"-"+payload[3].ciclo
            };
        case FETCH_SEMESTRES:
            return {
                ...state,
                semestres: payload,
            };
        case CLEAN_DETALLE_SEMESTRE:
            return {
                ...state,
                detalleSemestres: payload,
            };
        case CLEAN_SEMESTRES:
            return {
                ...state,
                semestres: payload,
            };

        default:
            return state;
    }
};
