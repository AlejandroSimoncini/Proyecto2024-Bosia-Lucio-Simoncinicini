window.onload = function() {
    mostrarPuntajes();
};

function mostrarPuntajes() {
    const tabla = document.querySelector('table'); // obtener la tabla
    const tbody = tabla.querySelector('tbody'); 

    // limpia el contenido existente en el cuerpo de la tabla
    tbody.innerHTML = '';

    // obtiene el número total de jugadores guardados en localStorage
    const numJugadores = parseInt(localStorage.getItem("numJugadores")) || 0;

    // crea un array para almacenar los datos de los jugadores
    const jugadores = [];

    // itera sobre los jugadores y sus puntajes,  en el array
    for (let i = 1; i <= numJugadores; i++) {
        const nombre = localStorage.getItem(`jugador${i}_nombre`);
        const puntaje = parseInt(localStorage.getItem(`jugador${i}_puntaje`));

        // pone los datos en el array
        jugadores.push({ nombre, puntaje });
    }

    // ordena para hacel los primeros 10
    jugadores.sort((a, b) => b.puntaje - a.puntaje);

    // show del los primeros 10
    const numJugadoresAMostrar = Math.min(10, jugadores.length);
    for (let i = 0; i < numJugadoresAMostrar; i++) {
        const { nombre, puntaje } = jugadores[i];

        // nuev fila
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${puntaje}</td>
        `;

        // agrega esta al body
        tbody.appendChild(fila);
    }
}