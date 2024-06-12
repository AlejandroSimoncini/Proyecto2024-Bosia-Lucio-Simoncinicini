function botonPresionado(evento)
{
    var boton = document.getElementById('bajoTablero');
    if(evento.keyCode === 32)
    {
        boton.style.backgroundImage = 'url(../Imagenes/spacePrecionado.gif)';
    }   
}

function botonSuelto(evento)
{
    var botonSuelto = document.getElementById('bajoTablero');
    if(evento.keyCode === 32)
    {
        botonSuelto.style.backgroundImage = 'url(../Imagenes/spaceSinPresionar.gif)'
    }
}


function esconderBoton(evento)
{
    var esconder = document.getElementById('bajoTablero');
    esconder.style.display = 'none';
}

document.addEventListener('keypress', botonPresionado);
document.addEventListener('keyup', botonSuelto);
