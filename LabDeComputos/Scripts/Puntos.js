function GameOver(evento)
{
    var aparecer = document.getElementById('tomaDatos');
    aparecer.style.display = 'flex';
}



function guardarPuntaje()
{
    let nombre = document.getElementById("nombre").value;
    let puntaje = obtenerScore();

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("puntaje", puntaje);
}