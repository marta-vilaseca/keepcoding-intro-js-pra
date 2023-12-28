const datos = [
  {
    id: 1,
    nombre: "Juan",
    habilidades: ["JavaScript", "HTML", "CSS"],
    proyectos: [
      { id: 1, nombre: "Proyecto 1" },
      { id: 2, nombre: "Proyecto 2" },
    ],
  },
  {
    id: 2,
    nombre: "María",
    habilidades: ["Python", "SQL", "Django"],
    proyectos: [
      { id: 3, nombre: "Proyecto 3" },
      { id: 4, nombre: "Proyecto 4" },
    ],
  },
  {
    id: 3,
    nombre: "Pedro",
    habilidades: ["Java", "Spring", "Hibernate"],
    proyectos: [
      { id: 5, nombre: "Proyecto 5" },
      { id: 6, nombre: "Proyecto 6" },
    ],
  },
];

// PARTE 1 - Devolver una lista con los desarrolladores que conozcan Javascript
const desarrolladoresJavascript = datos.filter((dev) => {
  return dev.habilidades.includes("JavaScript");
});

console.log(desarrolladoresJavascript);

// PARTE 2 - Crear una lista con todos los nombres de proyecto
const nombresProyectos = datos.reduce((accum, dev) => {
  for (let proyecto of dev.proyectos) {
    accum.push(proyecto.nombre);
  }
  return accum;
}, []);

console.log(nombresProyectos);
