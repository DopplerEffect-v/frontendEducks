import { FETCH_USUARIOS, BUSCAR_USUARIOS, FETCH_USUARIO,ERRORES_CARGA_MASIVA } from "./UsuarioTypes";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_USUARIOS:
            return {
                ...state,
                usuarios: payload,
            };
        case BUSCAR_USUARIOS:
            return {
                ...state,
                usuarios: payload,
            };
        case FETCH_USUARIO:
            return {
                ...state,
                usuario: payload,
            };

        case ERRORES_CARGA_MASIVA:
            return {
                ...state,
                errores: payload,
            };

        default:
            return state;
    }
};
