import {
    FETCH_PROGRAMAS,
    FETCH_PROGRAMA,
    CLEAN_PROGRAMA,
    BUSCAR_PROGRAMAS,
} from "./ProgramaTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_PROGRAMAS:
            return {
                ...state,
                programas: payload,
            };
        case FETCH_PROGRAMA:
            return {
                ...state,
                programa: payload,
            };
        case CLEAN_PROGRAMA:
            return {
                ...state,
                programa: payload,
            };
        case BUSCAR_PROGRAMAS:
            return {
                ...state,
                programas: payload,
            };

        default:
            return state;
    }
};
