function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//creer le compteur

let secondes = 0;
let StartCompteur = false;

let chronoContainer = document.querySelector("#chrono-container") as HTMLDivElement;
let chronoInterval: number;

function tictac() {
    if (StartCompteur) {
        secondes++;
        const minutesAffichage = Math.floor(secondes / 60);
        const secondesAffichage = (secondes % 60).toString().padStart(2, '0');
        chronoContainer.innerText = `temps écoulé : ${minutesAffichage}:${secondesAffichage}`;
    }
}

    


// Créer un tableau de valeurs de couleurs
const tileColors = ['black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
shuffleArray(tileColors);

// Créer un conteneur pour le plateau de jeu
const gameContainer = document.querySelector('#game-container') as HTMLDivElement;
const menuContainer = document.querySelector("#menu-container") as HTMLDivElement;
const restartButton = document.createElement("button") as HTMLButtonElement ;
const compteurContainer = document.querySelector('#compteur-container') as HTMLDivElement;


let flippedTiles: HTMLElement[] = []; // tableau pour récupérer les tuiles retournées
let wonTiles: string[] = [] // tableau pour récupérer le nombre de tuiles gagnés
let compteur = 0 
function clic(tileElement: HTMLElement) {
    if (flippedTiles.length < 2 && !flippedTiles.includes(tileElement) && tileElement.style.backgroundColor !== 'red') {
        tileElement.style.backgroundColor = tileElement.getAttribute('data-tile-id')!;
        flippedTiles.push(tileElement);
        if (flippedTiles.length === 2) {
            const tile1 = flippedTiles[0].getAttribute('data-tile-id');
            const tile2 = flippedTiles[1].getAttribute('data-tile-id');

            // Les tuiles correspondent
            if (tile1 === tile2) {
                flippedTiles.forEach(tile => {
                    tile.style.backgroundColor = 'red';
                });
                flippedTiles = [];
                wonTiles.push("X");

            } if (wonTiles.length == 8) { // Afficher bouton restart quand partie terminée
                restartButton.innerText = "Recommencer";
                restartButton.setAttribute("id", "restartbutton");
                menuContainer.appendChild(restartButton);
                restartButton.style.display = "block";
                gameContainer.classList.add("less-opacity")
            }
                
            else {
                // Les tuiles ne correspondent pas
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
    compteurContainer.classList.add("hidden");

// Créer et afficher les tuiles sur le plateau de jeu
function init(){

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
    StartCompteur = true;  // Démarrage du compteur
    chronoInterval = setInterval(tictac, 1000); // Démarrage du chronomètre
})

dogstartButton.addEventListener("click", () => {
    buttonRemover()
    gameContainer?.classList.remove("hidden-visibility");
    chronoContainer?.classList.remove("hidden-visibility");
    compteurContainer?.classList.remove("hidden-visibility");
    dogInit();
    StartCompteur = true;  // Démarrage du compteur
    chronoInterval = setInterval(tictac, 1000); // Démarrage du chronomètre
});


// Relance la partie quand le bouton est cliqué
restartButton.addEventListener("click", () => {
    wonTiles = [];
    restartButton.style.display = "none";
    gameContainer.classList.remove("less-opacity");
    const findTiles = document.querySelectorAll(".tile");
    findTiles?.forEach ( tile => tile.remove());
    shuffleArray(tileColors);
    dogInit();
})

// Partie avec les images de chien
let dogsDatas: string[] = []
let dogFirstFlippedTile: HTMLElement | null;
let dogWonTiles: HTMLElement[] = [];

async function getDogs() {
    try {

        for(let i = 0; i < 8; i++){
            const reponse = await fetch("https://dog.ceo/api/breeds/image/random")
            const dogData = await reponse.json();
            dogsDatas.push(dogData.message)
        }
        console.log('reponse', dogsDatas)
    }
    catch(err){
        console.error('error', err)
    }
}

getDogs();


function dogInit() {
    const dogTilesElement = new Array(16).fill('').map( (_, i) => {
    const dogTile = document.createElement("img");
    dogTile.classList.add("tile");
    dogTile.addEventListener("click", () => {
        dogTile.setAttribute("src", dogsDatas[Math.floor(i/2)]);
            if (dogFirstFlippedTile === null) {
                dogFirstFlippedTile = dogTile;
                console.log(dogFirstFlippedTile);
            }
            else if (dogFirstFlippedTile?.getAttribute("src") === dogTile.getAttribute("src")) {
                console.log(dogTile.getAttribute("src"))
                dogWonTiles.push(dogFirstFlippedTile);
              if (dogWonTiles.length == 8){
                gameContainer.classList.add("less-opacity");
              }
              else {
                dogFirstFlippedTile = null;
                compteur++;
              }
            }
            else {
              setTimeout(() => {
                dogFirstFlippedTile?.removeAttribute("src");
                dogTile.removeAttribute("src");
                dogFirstFlippedTile = null;
              }, 1000);
              compteur++;
            }
          });
          return dogTile;
    })
    dogTilesElement.sort( () => Math.random() - 0.5);
    dogTilesElement.forEach( dogTile => gameContainer.appendChild(dogTile));
}
