function obtenerUsuario(id) {
  let usuario;
  return new Promise((resolve, reject) => {
    if (id !== 1) {
      reject(new Error("No se ha encontrado al usuario"));
    }
    setTimeout(() => {
      resolve((usuario = { id: 1, nombre: "John Doe" }));
    }, 2000);
  });
}

const usuario = obtenerUsuario(1)
  .then((response) => console.log(response))
  .catch((err) => console.log(err.message));
