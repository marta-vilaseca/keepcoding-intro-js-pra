# 👩🏻‍💻 Parte 1: Ejercicios

## Ejercicio 1 [[solución]](./ejercicio1.js)

Crea un archivo **`ejercicio1.js`** que tenga un objeto **usuario** con los siguientes campos:

- **Nombre** (el tuyo o inventado)
- **Apellidos** (el tuyo o inventado)
- **Una lista** con los temas del bootcamp **Node.js, Git** y **React** con sus **nombres** y **fechas de inicio** de cada módulo. Fecha en formato `YYYY-MM-DD`
- **Si estás en busqueda activa** con un valor de **verdadero o false**

En este archivo queremos **mostrar por pantalla la fecha de inicio del módulo de react** del objeto que hemos creado anteriormente.

## Ejercicio 2: Arreglar bug [[solución]](./bug.js)

Nuestro cliente está intenando calcular el promedio de una lista de números pero nos dice que no funciona. No nos da el error, solo este código que es el que tiene en producción.

```
const calcularPromedio = (numeros) => {
    let sumaTotal = 0;
    for (let i = 0; i <= numeros.length; i++) {
        sumaTotal += numeros[i];
    }
    const promedio = sumaTotal / numeros.length;
    return promedio;
};

const listaNumeros = [1, 2, 3, 4, 5];
const promedioNumeros = calcularPromedio(listaNumeros);
```

Para este ejercicio tenemos que crear un archivo llamado **`bug.js`** con la solución.

## Ejercicio 3: Transformaciones [[solución]](./transform.js)

Nuestro cliente tiene un array de datos y nos ha pedido que saquemos la siguiente información. El listado de los desarrolladores que tengan como habilidad “JavaScript” y el listado de los proyectos en el que sus desarrolladores trabajan.

Estos son los datos:

```
const datos = [
    {
        id: 1,
        nombre: 'Juan',
        habilidades: ['JavaScript', 'HTML', 'CSS'],
        proyectos: [
            { id: 1, nombre: 'Proyecto 1' },
            { id: 2, nombre: 'Proyecto 2' }
        ]
    },
    {
        id: 2,
        nombre: 'María',
        habilidades: ['Python', 'SQL', 'Django'],
        proyectos: [
            { id: 3, nombre: 'Proyecto 3' },
            { id: 4, nombre: 'Proyecto 4' }
        ]
    },
    {
        id: 3,
        nombre: 'Pedro',
        habilidades: ['Java', 'Spring', 'Hibernate'],
        proyectos: [
            { id: 5, nombre: 'Proyecto 5' },
            { id: 6, nombre: 'Proyecto 6' }
        ]
    }
];
```

Tenemos que hacer las operaciones necesarias para obtener estos 2 listados:

```
const desarrolladoresJavascript = [
    {
        "id": 1,
        "nombre": "Juan",
        "habilidades": ["JavaScript", "HTML", "CSS"],
        "proyectos": [
            { "id": 1, "nombre": "Proyecto 1"},
            { "id": 2, "nombre": "Proyecto 2" }
        ]
    }
]

const nombresProyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6']
```

Hay que crear un archivo **`transform.js`** con la solución.

## Ejercicio 4: Arreglar bug de asincronía [[solución]](./bugAsync.js)

Tenemos otro error que nuestro cliente nos pide arreglar. El cliente está pidiendo un usuario y nos dice que está usando el id correcto el 1. Pero que siempre le da undefined. Nos ha pasado el código que tenemos que revisar y arreglar.

```
// Este programa simula una llamada asincrónica para obtener un usuario

function obtenerUsuario(id) {
    let usuario;
    setTimeout(() => {
        if (id === 1) {
            usuario = { id: 1, nombre: 'John Doe' };
    }
    }, 2000);

    return usuario;
}

const usuario = obtenerUsuario(1);
console.log(usuario);
```

Para este problema crear un archivo llamado **`bugAsync.js`** con la solución.

## Ejercicio 5: Catálogo Musical [[solución]](./catalogo/catalogo.js) + [[html]](./catalogo/index.html)

Imagina que estás creando un sistema de gestión para un catálogo musical.

Cada canción tiene las siguientes propiedades:

> **Nombre de la Canción**  
> **Género**  
> **Duración (en minutos)**

Implementa un programa que permita realizar las siguientes operaciones:

- **Agregar Canción:** Permite al usuario ingresar información sobre una nueva canción y agrégala al catálogo.
- **Listar Canciones:** Muestra en la consola la información detallada de todas las canciones en el catálogo. Si el catálogo está vacío, imprime un mensaje indicando que no hay canciones.
- **Buscar Canciones por Género:** Pide al usuario que ingrese un género y muestra en la consola todas las canciones de ese género.
- **Calcular Promedio de Duración:** Calcula y muestra en la consola

Estructura Sugerida:

```
function crearCatalogo() {

    // ...

    return {
        agregarCancion: agregarCancion,
        listarCanciones: listarCanciones,
        buscarPorGenero: buscarPorGenero,
        calcularPromedioDuracion: calcularPromedioDuracion
    };
}

let miCatalogo = crearCatalogo();

// …
```
