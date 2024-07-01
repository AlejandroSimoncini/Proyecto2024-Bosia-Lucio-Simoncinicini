//board
let board;
let boardWidth=750;
let boardHeight=250;
let context; //variable usada para dibujar sobre el canvas

//dino
let dinoWidth=50;
let dinoHeight=80;
let dinoX=50;
let dinoY=boardHeight-dinoHeight; //altura del tablero - altura del dinosaurio
let dinoImg;

let dino={
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight,
}

//cactus
let cactusArray=[];
let cactus1Width=34;
let cactus2Width=70;
let catusHeight=70;
let cactusX=700;
let cactusY=boardHeight-catusHeight;
let cactus1Img;
let cactus2Img;

//fisicas
let velocidadX= -12;
let velocidadSalto = 0;
let gravedad = 1.5;

let gameOver;
let score=0;
let showScore;
let finalScore;
const dificultad=1;

window.onload = function() //inicializa el board
{
    board = document.getElementById("board"); //busca el elemento board en el html
    board.height=boardHeight;
    board.width=boardWidth;

    context = board.getContext("2d"); //se usa para dibujar en el board

    dinoImg= new Image();
    dinoImg.src = "../Imagenes/DinoJuego.png";
    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width , dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "../Imagenes/Cactus1Juego.png";

    cactus2Img = new Image();
    cactus2Img.src = "../Imagenes/Cactus3Juego.png";
    
    requestAnimationFrame(actualizar);
    setInterval(crearCactus, 1000); //llama a la funcion crear cactus cada 1000 milisegundos = 1 segundo
    
    document.addEventListener("keydown", saltar);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

function checkScreenSize() {
    const jumpButton = document.getElementById('jumpButton');
    if (window.innerWidth < 500) {
        jumpButton.style.display = 'block';
        esconderBoton();
    } else {
        jumpButton.style.display = 'none';
    }
}

function jump() {
    if (dino.y === dinoY) {
        velocidadSalto = -20;
    }
}

function guardarPuntaje() {

    console.log("Guardando puntaje..."); // munsaje en consola
    let nombre = document.getElementById("nombre").value;
    let puntaje = obtenerScore();

    // obtiene el num de jugadores ya registrados
    const numJugadoresRegistrados = parseInt(localStorage.getItem("numJugadores")) || 0;

    // pone los datos del nuevo jugador en localStorage
    localStorage.setItem(`jugador${numJugadoresRegistrados + 1}_nombre`, nombre);
    localStorage.setItem(`jugador${numJugadoresRegistrados + 1}_puntaje`, puntaje.toString());

    // num +1
    localStorage.setItem("numJugadores", numJugadoresRegistrados + 1);
    location.reload();
}

function GameOver(evento)
{
    // guardamo el puntaje
    guardarPuntaje();

}

function checkEnter(evento)// cuando presiona enter luego de poner el nombre
 {
    console.log("Tecla presionada:", evento.key);
    if (evento.key === "Enter") { 
        GameOver();
    }
}

function actualizar()  //funcion que dibuja cada frame
{
    requestAnimationFrame(actualizar);
    
    if (gameOver) {
        esconderBoton();
        return;
    }

    context.clearRect(0,0,boardWidth,boardHeight); //elimina los movimientos anteriores de cada elemento
    
    velocidadSalto += gravedad;
    dino.y = Math.min(dino.y + velocidadSalto, dinoY); //agrega la velocidad y asegura que el dinosaurio no salga del board
    context.drawImage(dinoImg, dino.x, dino.y, dino.width , dino.height);

    for (let i=0 ;i <cactusArray.length; i++)  //itera entre los cactus que pertenecen al array modificando su posicion en x
    {
        let cactus=cactusArray[i];
        cactus.x+=velocidadX;
        context.drawImage(cactus.img , cactus.x , cactus.y , cactus.width , cactus.height);
        
        if (colision(dino,cactus)) 
        {
            gameOver = true;
            finalScore = showScore;
            // interfaz para ingresar nombre y guardar puntaje
            var aparecer = document.getElementById('tomaDatos');
            aparecer.style.display = 'flex';
            return; // Sal del bucle para detener la actualización del juego
        }
    }
          
    score += 0.12;
    showScore = Math.floor(score);
    
    context.font = '24px Arial';
    context.fillStyle = 'black';

    context.fillText(showScore.toString(),650,20);

    
}

function crearCactus()
{
    let cactus={
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : catusHeight
    }
    //asignamos el valor null a img y width ya que dependen de cada tipo de cactus

    let crearCactusRand = Math.random(); //devuelve funciones entre 0 y 1
    
    if (crearCactusRand>0.80) 
    {
        cactus.img=cactus2Img;
        cactus.width=cactus2Width;
        cactusArray.push(cactus);
    }
    else if (crearCactusRand>0.50) 
    {
        cactus.img=cactus1Img;
        cactus.width=cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactus.shift(); //elimina el primer elemento del arreglo para que no se acumule en la memoria
    }
}

function saltar(event)
{
    if ((event.code == "Space" || event.code == "ArrowUp") && dino.y===dinoY) {
        velocidadSalto = -20;
    }
}

function colision(din,cac)
{
    return din.x < cac.x + cac.width  && //esquina superior izquierda del dino / esquina superior derecha catus
        din.x + dino.width > cac.x  &&  //esquina superior derecha dino / esquina superior izquirda cactus
        din.y < cac.y + cac.height &&  // esquina superior izquierda dino / esquina inferior izquierda cactus
        din.y + din.height > cac.y;   // esquina inferior izquierda dino / esquina superior izquierda cactus
}

function obtenerScore()
{
    return finalScore;
}