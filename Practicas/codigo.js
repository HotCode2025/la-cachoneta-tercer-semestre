//hacer funcion con la formula, llamar formula y que pase parametros, 
// en los argumentos paso los numeros que necesito

// 1 será piedra, 2 será papel y 3 será tijera

function azar(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugador) {
    if (jugador == 1) return "Piedra 🪨";
    if (jugador == 2) return "Papel 📃";
    if (jugador == 3) return "Tijera ✂️";
    return "Elige una opcion valida 🚩";
}

//Variables de estado

//let max = 3
//let min = 1
//let pc = Math.floor(Math.random()*(max-min+1)+min)
//let pc = azar(1,3);
//let jugador = prompt("Elige : 1 piedra, 2 papel, 3 tijera")
let jugador = 0
let pc = 0

//Sistema de inicio al mejor de 5
let triunfos = 0
let perdidas = 0 


// Se llama la funcion de combate
function combatir(jugador, pc) {
    if (pc == jugador) {
        alert("EMPATE 🤝")
    } else if (jugador == 1 && pc == 3) {
        alert("LA PIEDRA 🪨 HA ROTO LAS TIJERAS ✂️, GANASTE✅! ")
        triunfos = triunfos + 1
    } else if (jugador == 2 && pc == 1) {
        alert("TU PAPEL 📃 HA ENVUELTO A LA PIEDRA 🪨, GANASTE✅! ")
        triunfos = triunfos + 1
    } else if (jugador == 3 && pc == 2) {
        alert("TUS TIJERAS ✂️ CORTARON EL PAPEL 📃, GANASTE✅!")
        triunfos = triunfos + 1
    } else {
        alert("HAS PERDIDO❌")
        perdidas = perdidas + 1
    }
}

while (triunfos < 3 && perdidas < 3) {
    pc = azar(1, 3);
    jugador = prompt("Elige : 1 piedra, 2 papel, 3 tijera")
    
    alert("Vos elegiste: " + eleccion(jugador));
    alert("PC elige: " + eleccion(pc));
    
    // Se llama a la funcion jugador y pc para que el combate ocurra
    combatir(jugador, pc); 
}

alert("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces.")