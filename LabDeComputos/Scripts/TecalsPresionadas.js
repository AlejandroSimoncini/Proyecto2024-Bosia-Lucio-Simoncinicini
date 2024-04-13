function TeclaPresionada(evento){
    if(evento.keyCode === 32)
    {
        var elementosMenu = document.querySelectorAll('.menu');

        elementosMenu.forEach(function(elemento) {
        elemento.style.opacity = '0.5';
        elemento.style.filter = 'blur(10px)';
        }
    );
        var elementosContainer = document.getElementById('BotonContainer')          /*Script de modificacion de la pagina al apretar la tecla espacio*/ 
        elementosContainer.style.display = 'flex';
        elementosContainer.style.visibility = 'visible';


        
    }
}

document.addEventListener('keydown', TeclaPresionada);
