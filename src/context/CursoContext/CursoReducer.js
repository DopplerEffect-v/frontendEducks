import {
    FETCH_CURSOS,
} from "./CursoTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_CURSOS:
            return {
                ...state,
                cursos: payload
            };

        default:
            return state;
    }
};
