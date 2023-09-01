function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let chronoContainer = document.querySelector("#chrono-container") as HTMLDivElement;
let chronoInterval: number;
let startTime: number; // New variable to store the start time
let isGameFinished = false;


function tictac() {
    if (!isGameFinished) {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        const minutesAffichage = Math.floor(elapsedSeconds / 60);
        const secondesAffichage = (elapsedSeconds % 60).toString().padStart(2, '0');
        chronoContainer.innerText = `temps écoulé : ${minutesAffichage}:${secondesAffichage}`;
    } else {
        clearInterval(chronoInterval); // Stop the timer interval
    }
}


// Créer un tableau de valeurs de couleurs
const tileColors = ['black', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'black', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
shuffleArray(tileColors);

// Créer un conteneur pour le plateau de jeu
const gameContainer = document.querySelector('#game-container') as HTMLDivElement;
const menuContainer = document.querySelector("#menu-container") as HTMLDivElement;
const restartButton = document.createElement("button") as HTMLButtonElement;
const compteurContainer = document.querySelector('#compteur-container') as HTMLDivElement;


let flippedTiles: HTMLElement[] = []; // tableau pour récupérer les tuiles retournées
let wonTiles: string[] = [] // tableau pour récupérer le nombre de tuiles gagnés
let compteur = 0
function clic(tileElement: HTMLElement) {
    if (flippedTiles.length < 2 && !flippedTiles.includes(tileElement) && !tileElement.hasAttribute('data-matched')) {
        tileElement.style.backgroundColor = tileElement.getAttribute('data-tile-id')!;
        flippedTiles.push(tileElement);
        if (flippedTiles.length === 2) {
            const tile1 = flippedTiles[0].getAttribute('data-tile-id');
            const tile2 = flippedTiles[1].getAttribute('data-tile-id');

            if (tile1 === tile2) {
                flippedTiles.forEach(tile => {
                    tile.setAttribute('data-matched', 'true'); // Mark tiles as matched
                });
                flippedTiles = [];
                wonTiles.push("X");

                if (wonTiles.length === 8) { // Check if all tiles are matched
                    isGameFinished = true;
                    restartButton.innerText = "Recommencer";
                    restartButton.setAttribute("id", "restartbutton");
                    menuContainer.appendChild(restartButton);
                    restartButton.style.display = "block";
                    gameContainer.classList.add("less-opacity");
                }

            } else {
                setTimeout(() => {
                    flippedTiles.forEach(tile => {
                        tile.style.backgroundColor = 'blue';
                        tile.innerText = "";
                    });
                    flippedTiles = [];
                }, 1000);
                compteur++;
            }
        }

        if (compteur > 0) {
            compteurContainer.innerText = `nombre de coups : ${compteur}`;
            compteurContainer.classList.remove("hidden");
        } else {
            compteurContainer.innerText = "";
            compteurContainer.classList.add("hidden");
        }
    }
    compteurContainer.innerText = `nombre de coups : ${compteur}`;
}

compteurContainer.innerText = "";
//compteurContainer.classList.add("hidden");

// Créer et afficher les tuiles sur le plateau de jeu
function init() {

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
}

// Afficher le plateau de jeu avec un bouton de démarrage
let startButton = document.querySelector("#startbutton") as HTMLButtonElement;
let dogstartButton = document.querySelector("#dog-start-button") as HTMLButtonElement;

function buttonRemover() {
    startButton.remove();
    dogstartButton.remove();
}

startButton.addEventListener("click", () => {
    buttonRemover()
    gameContainer?.classList.remove("hidden-visibility");
    chronoContainer?.classList.remove("hidden-visibility");
    compteurContainer?.classList.remove("hidden-visibility");
    init();
    startTime = Date.now();
    chronoInterval = setInterval(tictac, 1000); 
});

dogstartButton.addEventListener("click", () => {
    buttonRemover()
    gameContainer?.classList.remove("hidden-visibility");
    chronoContainer?.classList.remove("hidden-visibility");
    compteurContainer?.classList.remove("hidden-visibility");
    dogInit();
    startTime = Date.now(); // Record the start time
    chronoInterval = setInterval(tictac, 1000); // Start the timer interval
});



// Relance la partie quand le bouton est cliqué
restartButton.addEventListener("click", () => {
    // Arrêter le chronomètre
    clearInterval(chronoInterval);

    // Réinitialiser le chronomètre et le compteur
    startTime = 0;
    chronoContainer.innerText = "temps écoulé : 0:00";
    compteur = 0;
    compteurContainer.innerText = "";
    startTime = Date.now();
    chronoInterval = setInterval(tictac, 1000);

    // Réinitialiser l'état du jeu
    wonTiles = [];
    isGameFinished = false;

    // Réinitialiser les tuiles et recommencer le jeu
    const findTiles = document.querySelectorAll(".tile");
    findTiles?.forEach(tile => tile.remove());
    shuffleArray(tileColors);
    init();

    // Cacher le bouton de recommencement et rétablir l'opacité du plateau
    restartButton.style.display = "none";
    gameContainer.classList.remove("less-opacity");
});

const dogRestartButton = document.createElement("button") as HTMLButtonElement;
dogRestartButton.innerText = "Recommencer";
dogRestartButton.setAttribute("id", "dog-restart-button");
menuContainer.appendChild(dogRestartButton);
dogRestartButton.style.display = "none"; 

// Relance la partie chien quand le bouton est cliqué
dogRestartButton.addEventListener("click", () => {
    // Arrêter le chronomètre
    clearInterval(chronoInterval);

    // Réinitialiser le chronomètre et le compteur
    startTime = 0;
    chronoContainer.innerText = "temps écoulé : 0:00";
    compteur = 0;
    compteurContainer.innerText = "";
    startTime = Date.now();
    chronoInterval = setInterval(tictac, 1000);

    // Réinitialiser l'état du jeu de chien
    dogWonTiles = [];

    // Réinitialiser les tuiles de chien et recommencer le jeu de chien
    const dogTiles = document.querySelectorAll(".tile img");
    dogTiles.forEach((dogTile) => {
        dogTile.remove();
    });

    // Réordonner et afficher à nouveau les tuiles de chien
    dogInit();

    // Cacher le bouton de redémarrage pour la partie chien
    dogRestartButton.style.display = "none";
    gameContainer.classList.remove("less-opacity");
});

// Partie avec les images de chien
let dogsDatas: string[] = []
let dogFirstFlippedTile: HTMLElement | null;
let dogWonTiles: HTMLElement[] = [];

async function getDogs() {
    try {

        for (let i = 0; i < 8; i++) {
            const reponse = await fetch("https://dog.ceo/api/breeds/image/random")
            const dogData = await reponse.json();
            dogsDatas.push(dogData.message)
        }
        console.log('reponse', dogsDatas)
    }
    catch (err) {
        console.error('error', err)
    }
}

getDogs();


function dogInit() {
    const dogTilesElement = new Array(16).fill('').map((_, i) => {
        const dogSrc = dogsDatas[Math.floor(i / 2)]
        const tile = document.createElement('div')
        tile.classList.add('tile')
        tile.classList.add("blue");
        const dogTile = document.createElement("img");
       
        dogTile.classList.add("tile");
        
        dogTile.setAttribute("src", dogsDatas[Math.floor(i / 2)]);
        dogTile.classList.add("hidden-visibility");
        tile.appendChild(dogTile);
        tile.addEventListener("click", () => {
            if (flippedTiles.length < 2 && !flippedTiles.includes(tile)) {
                flippedTiles.push(tile);}
            dogTile.classList.toggle("hidden-visibility")

            if (dogFirstFlippedTile === null) { 
                dogFirstFlippedTile = dogTile;
            }
            
            else if (dogFirstFlippedTile?.getAttribute("src") === dogSrc) {
                dogWonTiles.push(dogFirstFlippedTile);
                if (dogWonTiles.length == 8) {
                    dogRestartButton.innerText = "Recommencer";
                    dogRestartButton.setAttribute("id", "restartbutton");
                    menuContainer.appendChild(dogRestartButton);
                    dogRestartButton.style.display = "block";
                    gameContainer.classList.add("less-opacity")
                }
                else {
                    dogTile.classList.toggle("hidden-visibility")
                    dogFirstFlippedTile = null;
                    flippedTiles = [];
                }
            }
            else {
                setTimeout(() => {
                    dogTile.classList.toggle("hidden-visibility")
                    dogFirstFlippedTile = null;
                }, 1000);
                compteur++
            }

    });
        return tile;
    }
    )
    dogTilesElement.sort(() => Math.random() - 0.5);
    dogTilesElement.forEach(dogTile => gameContainer.appendChild(dogTile));
}
