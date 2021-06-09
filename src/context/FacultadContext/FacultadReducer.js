import {
    FETCH_FACULTADES,
    FETCH_FACULTAD,
    CLEAN_FACULTAD,
    BUSCAR_FACULTADES,
    VERIFY_SIGLAS,
} from "./FacultadTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_FACULTADES:
            return {
                ...state,
                facultades: payload,
            };
        case FETCH_FACULTAD:
            return {
                ...state,
                facultad: payload,
            };
        case CLEAN_FACULTAD:
            return {
                ...state,
                facultad: payload,
            };
        case BUSCAR_FACULTADES:
            return {
                ...state,
                facultades: payload,
            };
        case VERIFY_SIGLAS:
            return {
                ...state,
                flagSiglas: payload,
            };

        default:
            return state;
    }
};
