//crear los carriles e insertar la funcion de movimineto para las imagenes
var cont_principal = document.querySelector('.contenedor-principal')
let intervaloCreacionjug;
let intervaloMovimiento
//pre cargar los audios
var audio0 = new Audio('../audio/1.mp3')
var audio1 = new Audio('../audio/2.mp3')
var audio2 = new Audio('../audio/3.mp3')
var audio3 = new Audio('../audio/4.mp3')
var audio4 = new Audio('../audio/5.mp3')


function Iniciar() {
    let boton = document.querySelector('.btn-Prin')
    boton.setAttribute('onclick', 'parar()')
    boton.textContent = 'parar'

    var cuerdaJug = document.querySelectorAll('.carril')

    intervaloCreacionjug = setInterval(() => {

        let jugador = crearJugador();
        let NumCarril = Math.floor(Math.random() * 4)
        cuerdaJug[NumCarril].appendChild(jugador)
    }, 1000)
    let pasosJug = document.querySelectorAll(".fantasmita");
    pasosJug.forEach(element => {
        element.style.left = "-100%"; // Establecer la posición inicial en la parte izquierda
    });
    intervaloMovimiento = setInterval(() => {

        let pasosJug = document.querySelectorAll(".contJugador");

        pasosJug.forEach(element => {
            let left = parseFloat(element.style.left) || 0;
            if (left <= 600) {
                element.style.left = left + 10 + "px";
            } else {
                element.parentNode.removeChild(element);
            }
        });
    }, 100)


}
function crearJugador() {
    let cont_Jug = document.createElement('div')
    cont_Jug.setAttribute('class', 'contJugador')
    let jugador = document.createElement('img')
    jugador.setAttribute('src', 'https://pa1.narvii.com/6528/588498059da7c55ac1a4c56c2b801c39639ebf14_hq.gif')
    jugador.setAttribute('class', 'fantasmita');
    cont_Jug.appendChild(jugador)
    return cont_Jug
}
//para el juego y elimina todos las imagenes para reiniciarlo
function parar() {
    let boton = document.querySelector('.btn-Prin')
    boton.setAttribute('onclick', 'Iniciar()')
    boton.textContent = 'Iniciar'
    clearInterval(intervaloCreacionjug)
    var cuerdaJug = document.querySelectorAll('.carril')
    cuerdaJug.forEach(cont => {
        var img = cont.querySelectorAll('img');
        img.forEach(imagenes => {
            imagenes.remove();
        })
    });
}


//interacciones de los botones

const btn0 = document.getElementById('btn0')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
let cont_action = document.querySelectorAll('.carril')
let contador = document.querySelector('.contador')
let cont = 0;
document.addEventListener('keydown', (evt) => {
    audio4.pause();
    audio4.currentTime = 0;
    //verifica si la letra pulsada es una de las elegidas, y luego verifica en que posicion esta el fantasma
    if (evt.key === 'a') {
        audio0.pause();
        audio0.currentTime = 0;
        console.log(parseFloat(cont_action[0].querySelector('.contJugador').style.left))
        btn0.click();
        if (parseFloat(cont_action[0].querySelector('.contJugador').style.left) > 520) {
            audio0.play();
            remover(0)
            cont = cont + 1
            contador.textContent = padLeft(cont, 3)
        }
        else if (parseFloat(cont_action[0].querySelector('.contJugador').style.left) < 520) {
            remover(0)
            audio4.play();
        }
    } else if (evt.key === 's') {
        audio1.pause();
        audio1.currentTime = 0;
        console.log(parseFloat(cont_action[1].querySelector('.contJugador').style.left))
        btn0.click();
        if (parseFloat(cont_action[1].querySelector('.contJugador').style.left) > 520) {
            remover(1);
            audio1.play();
            cont = cont + 1
            contador.textContent = padLeft(cont, 3)
        }
        else if (parseFloat(cont_action[1].querySelector('.contJugador').style.left) < 520) {
            remover(1)
            audio4.play()
        }
    } else if (evt.key === 'd') {
        audio2.pause();
        audio2.currentTime = 0;
        console.log(parseFloat(cont_action[2].querySelector('.contJugador').style.left))
        btn0.click();
        if (parseFloat(cont_action[2].querySelector('.contJugador').style.left) > 520) {
            remover(2)
            audio2.play()
            cont = cont + 1
            contador.textContent = padLeft(cont, 3)
        }
        else if (parseFloat(cont_action[2].querySelector('.contJugador').style.left) < 520) {
            remover(2)
            audio4.play()
        }
    } else if (evt.key === 'f') {
        audio3.pause();
        audio3.currentTime = 0;
        console.log(parseFloat(cont_action[3].querySelector('.contJugador').style.left))
        btn0.click();
        if (parseFloat(cont_action[3].querySelector('.contJugador').style.left) > 520) {
            remover(3)
            audio3.play()
            cont = cont + 1
            contador.textContent = padLeft(cont, 3)
        }
        else if (parseFloat(cont_action[3].querySelector('.contJugador').style.left) < 520) {
            audio4.play()
            remover(3)
        }
    }
})


function padLeft(x, y) {
    return x.toString().padStart(y, '0')
}
//botones de pausa y despausar para que el juego se peuda despausar y seguir normalmente
function Pausa() {
    let btn = document.querySelector('.btn-Pau')
    btn.setAttribute('onclick', 'desPausar()')
    btn.textContent = 'despausar'
    clearInterval(intervaloCreacionjug)
    clearInterval(intervaloMovimiento)
}

function desPausar() {
    let btn = document.querySelector('.btn-Pau')
    btn.setAttribute('onclick', 'Pausa()')
    btn.textContent = 'pausar'
    Iniciar()
}
//funcion para quitar a los fantasmas cuando esten en el limite de la pista o cuando se le da click a un boton incorrecto
function remover(i) {
    let cont_action = document.querySelectorAll('.carril')
    cont_action[i].querySelector('.contJugador').remove();
}