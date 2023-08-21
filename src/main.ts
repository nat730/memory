// Mélanger un tableau en utilisant l'algorithme Fisher-Yates
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Créer un tableau de valeurs de tuiles
const tilevalues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// Mélanger les valeurs de tuiles
shuffleArray(tilevalues);

// Créer un conteneur pour le plateau de jeu
const gameContainer = document.querySelector('#game-container') as HTMLDivElement;

let flippedTiles: HTMLElement[] = []; // Array to hold the flipped tiles

// Fonction pour gérer le clic sur une tuile

function clic(tileElement: HTMLElement) {
    if (flippedTiles.length < 2 && !flippedTiles.includes(tileElement)&& tileElement.style.color !== 'red') {
        tileElement.style.color = "yellow";
        flippedTiles.push(tileElement);
        if (flippedTiles.length === 2) {
            const tile1 = flippedTiles[0].innerText;
            const tile2 = flippedTiles[1].innerText;
            if (tile1 === tile2) {
                // Les tuiles correspondent
                flippedTiles.forEach(tile => {
                    tile.style.color = 'red';
                });
                flippedTiles = [];
            } else {
                // Les tuiles ne correspondent pas
                setTimeout(() => {  
                    flippedTiles.forEach(tile => {
                        tile.style.color = 'blue';
                        tileElement.innerText = "","";
                    });
                    flippedTiles = [];
                }, 300);
            }
        }
    }
}

// Créer et afficher les tuiles sur le plateau de jeu
tilevalues.forEach(tile => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.style.color = 'blue';
    tileElement.addEventListener('click', () => {
        clic(tileElement);
        tileElement.innerText = tile;
    });
    gameContainer?.appendChild(tileElement);
});