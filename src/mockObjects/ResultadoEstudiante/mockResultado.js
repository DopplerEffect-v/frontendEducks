export default {
    idResultado: 1,
    numIndicadores: 2,
    codigo: "RE_INF_01",
    sumilla: "Relacionar diseño informático con contexto y necesidades",
    descripcion:
        "Aplicar el diseño de ingeniería para producir soluciones que satisfagan necesidades en contextos específicos",
    niveles:3,
    logroEsperado: 80,
    ultimaMedicion: "2020-2",
    objetivos: [
        {
            id: 1,
            codigo: "OBJ_ED_1",
        },
        {
            id: 2,
            codigo: "OBJ_ED_2",
        },
        {
            id: 3,
            codigo: "OBJ_ED_3",
        },
    ],
    indicadores: [
        {
            idIndicador: 1,
            codigo: "RE01_IN01",
            nombre: "Elabora Software",
            niveles: [
                {
                    idNivel: 1,
                    progreso: "Inicial",
                    descripcion:
                        "Identifica los requisitos y los patrones de diseño de la solución informática",
                },
                {
                    idNivel: 2,
                    progreso: "En Proceso",
                    descripcion:
                        "Establece trazabilidad entre requisitos (priorizados) y patrones de diseño.",
                },
                {
                    idNivel: 3,
                    progreso: "Satisfactorio",
                    descripcion:
                        "Diseña la solución informática considerando la mayoría de las restricciones y las necesidades a satisfacer",
                },
            ],
        },
        {
            idIndicador: 2,
            codigo: "RE01_IN02",
            nombre: "Destruye Software",
            niveles: [
                {
                    idNivel: 1,
                    progreso: "Inicial",
                    descripcion:
                        "Identifica los requisitos y los patrones de diseño de la solución informática",
                },
                {
                    idNivel: 2,
                    progreso: "En Proceso",
                    descripcion:
                        "Establece trazabilidad entre requisitos (priorizados) y patrones de diseño.",
                },
                {
                    idNivel: 3,
                    progreso: "Satisfactorio",
                    descripcion:
                        "Diseña la solución informática considerando la mayoría de las restricciones y las necesidades a satisfacer",
                },
            ],
        },
    ],
};
