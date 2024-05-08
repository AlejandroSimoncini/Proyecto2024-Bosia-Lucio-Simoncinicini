
        // Leer el número total de jugadores registrados
        const numJugadores = parseInt(localStorage.getItem("numJugadores")) || 0;

        // Mostrar los datos de todos los jugadores en la tabla
        const tabla = document.querySelector('table');
        for (let i = 1; i <= numJugadores && i <= 10; i++) {
            const nombreJugador = localStorage.getItem(`jugador${i}_nombre`);
            const puntaje = localStorage.getItem(`jugador${i}_puntaje`);
            
            const row = tabla.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            
            cell1.textContent = nombreJugador;
            cell2.textContent = puntaje;
        }