// Элементы DOM
const dino = document.getElementById ('dino')
const cactus = document.getElementById ('cactus')
const gameOVER = document.getElementById('game-over')
const startGame = document.querySelector('.startGame')
const restartGame = document.getElementById('restart-game')
const volumeControl = document.getElementById('volume')

// Глобальные переменные
let isAlive = null;
let currentAudio = null;

document.addEventListener('keydown', function() {
    if (gameOVER.style.display === 'none') {
        jumpDino();
    }
})

restartGame.addEventListener('click', startGAME)

volumeControl.addEventListener('input', (event) => {
    if (currentAudio) {
        currentAudio.volume = parseFloat(event.target.value)
    }
})

function jumpDino() {

    //Тернарный оператор && (логическое "И") выполняет проверку на истинность нескольких выражений. Он не эквивалентен "ИЛИ", так как их логика работы различается.
    !dino.classList.contains('jump') 
        && dino.classList.add('jump'),
        setTimeout( function() {
            dino.classList.remove('jump')}, 300);
}

function startGAME() {
    if (isAlive) {
        clearInterval(isAlive);
    }

    startGame.style.display = 'block';
    gameOVER.style.display = 'none';
    restartGame.style.display = 'none';

    dino.classList.remove('jump');
    cactus.style.opacity = '1';
    cactus.style.left = '100%';
    playRandomTrack ();

    
    isAlive = setInterval (() => {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let cactusLeft= parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

    if(cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        gameOver();
    }
}, 10)
}

function gameOver () {
    gameOVER.style.display = 'block';
    restartGame.style.display = 'block';
    startGame.style.display = 'none';
    
    clearInterval(isAlive);
}

function playRandomTrack () {
    const audioTracks = [
        './music/jeremy-blake-powerup.mp3',
        './music/chocolate-chip-by-uncle-morris.mp3',
        './music/density-time-maze.mp3',
        './music/kubbi-digestive-biscuit.mp3',
        './music/laxity-crosswords-by-seraphic-music.mp3'
    ]
    const randomIndex = Math.floor(Math.random() * audioTracks.length);

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
        // Создаем объект аудио только один раз
        currentAudio = new Audio(audioTracks[randomIndex]);

    currentAudio.volume = parseFloat(volumeControl.value)

    currentAudio.play();
}

startGAME();