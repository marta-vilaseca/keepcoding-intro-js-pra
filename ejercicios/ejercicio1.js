const usuario = {
  nombre: "Marta",
  apellidos: "Vilaseca Foradada",
  temarioBootcamp: [
    {
      nombre: "Node.js",
      fechaInicio: "2024-02-12",
    },
    {
      nombre: "Git",
      fechaInicio: "2023-11-18",
    },
    {
      nombre: "React",
      fechaInicio: "2024-04-15",
    },
  ],
  busquedaActiva: false,
};

console.log(usuario.temarioBootcamp[2].fechaInicio);
