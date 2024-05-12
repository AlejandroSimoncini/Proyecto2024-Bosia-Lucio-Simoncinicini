function Aparecer(evento)
{
if(evento.keyCode === 32)
{
    var Board = document.getElementById('board')
    Board.style.paddingTop = '100px';
    Board.style.paddingLeft = '27%';
    Board.style.paddingRight = '27%';
    Board.style.borderBottom = '0px';
}
}

document.addEventListener('keydown' , Aparecer);
