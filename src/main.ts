function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let compteur = 0;
let secondes = 0;

let ChronoContainer = document.querySelector("#chrono-container") as HTMLDivElement;
let chrono = window.setInterval(tictac, 1000);

function tictac() {
    secondes++;
    const minutesAffichage = Math.floor(secondes / 60);
    const secondesAffichage = (secondes % 60).toString().padStart(2, '0');
    ChronoContainer.innerText = `temps écoulé : ${minutesAffichage}:${secondesAffichage}`;
}

const tileColors = ['black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
shuffleArray(tileColors);

const gameContainer = document.querySelector('#game-container');
const compteurContainer = document.querySelector('#compteur-container') as HTMLDivElement;

let flippedTiles: HTMLElement[] = [];

function clic(tileElement: HTMLElement) {
    if (flippedTiles.length < 2 && !flippedTiles.includes(tileElement) && tileElement.style.backgroundColor !== 'red') {
        tileElement.style.backgroundColor = tileElement.getAttribute('data-tile-id')!;
        flippedTiles.push(tileElement);
        if (flippedTiles.length === 2) {
            const tile1 = flippedTiles[0].getAttribute('data-tile-id');
            const tile2 = flippedTiles[1].getAttribute('data-tile-id');
            
            if (tile1 === tile2) {
                flippedTiles.forEach(tile => {
                    tile.style.backgroundColor = 'red';
                });
                flippedTiles = [];
                compteur++;
            } 
            else {
                setTimeout(() => {
                    flippedTiles.forEach(tile => {
                        tile.style.backgroundColor = 'blue';
                        tile.innerText = "";
                    });
                    flippedTiles = [];
                }, 500);
                compteur++;
            }
        }
    }
    compteurContainer.innerText = `nombre de coups : ${compteur}`;
}

tileColors.forEach((color) => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.style.backgroundColor = 'blue';
    tileElement.setAttribute('data-tile-id', color);
    tileElement.addEventListener('click', () => {
        clic(tileElement);
    });
    gameContainer?.appendChild(tileElement);
});
