window.onload = function() {
    mostrarPuntajes();
};

function mostrarPuntajes() {
    const tabla = document.querySelector('table'); // Obtener la tabla
    const tbody = tabla.querySelector('tbody'); // Obtener el cuerpo de la tabla

    // Limpiar el contenido existente en el cuerpo de la tabla
    tbody.innerHTML = '';

    // Obtener el número total de jugadores guardados en localStorage
    const numJugadores = parseInt(localStorage.getItem("numJugadores")) || 0;

    // Crear un array para almacenar los datos de los jugadores
    const jugadores = [];

    // Iterar sobre los jugadores y sus puntajes, y guardarlos en el array
    for (let i = 1; i <= numJugadores; i++) {
        const nombre = localStorage.getItem(`jugador${i}_nombre`);
        const puntaje = parseInt(localStorage.getItem(`jugador${i}_puntaje`));

        // Agregar los datos del jugador al array
        jugadores.push({ nombre, puntaje });
    }

    // Ordenar el array de jugadores por puntaje de forma descendente
    jugadores.sort((a, b) => b.puntaje - a.puntaje);

    // Mostrar solo los primeros 10 jugadores en la tabla
    const numJugadoresAMostrar = Math.min(10, jugadores.length);
    for (let i = 0; i < numJugadoresAMostrar; i++) {
        const { nombre, puntaje } = jugadores[i];

        // Crear una nueva fila en la tabla con los datos del jugador
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${puntaje}</td>
        `;

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(fila);
    }
}