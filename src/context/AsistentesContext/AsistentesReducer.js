import { BUSCAR_ASISTENTES, FETCH_ASISTENTES,FETCH_NOASISTENTES } from "./AsistentesTypes";

export default (state, action) => {
    const { payload, type } = action;
    //fETCH DE DELETE AND ADD
    switch (type) {
        case FETCH_ASISTENTES:
            return {
                ...state,
                asistentes: payload,
            };
        case FETCH_NOASISTENTES:
            return {
                ...state,
                Noasistentes: payload,
            };
        case BUSCAR_ASISTENTES:
            return {
                ...state,
                asistentes: payload,
        };

        default:
            return state;
    }
};
