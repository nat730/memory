// Mélanger un tableau en utilisant l'algorithme Fisher-Yates
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//creer le compteur

let compteur = 0;
let secondes = 0;
let StartCompteur = false;
let chronoInterval;


  let ChronoContainer = document.querySelector("#chrono-container") as HTMLDivElement;
  let chrono = window.setInterval(tictac, 1000);    

  function tictac() {
    if (StartCompteur) {
        secondes++;
        const minutesAffichage = Math.floor(secondes / 60);
        const secondesAffichage = (secondes % 60).toString().padStart(2, '0');
        ChronoContainer.innerText = `temps écoulé : ${minutesAffichage}:${secondesAffichage}`;
    }
}
    


// Créer un tableau de valeurs de couleurs
const tileColors = ['black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'black', 'white', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
// Mélanger les valeurs de couleurs
shuffleArray(tileColors);

// Créer un conteneur pour le plateau de jeu
const gameContainer = document.querySelector('#game-container') as HTMLDivElement;
const menuContainer = document.querySelector("#menu-container") as HTMLDivElement;
const restartButton = document.createElement("button") as HTMLButtonElement ;
const compteurContainer = document.querySelector('#compteur-container') as HTMLDivElement;

let flippedTiles: HTMLElement[] = []; // tableau pour récupérer les tuiles retournées
let wonTiles: string[] = [] // tableau pour récupérer le nombre de tuiles gagnés

// Fonction pour gérer le clic sur une tuile
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
}
    compteurContainer.innerText = "";
    compteurContainer.classList.add("hidden");

// Créer et afficher les tuiles sur le plateau de jeu
function init(){

tileColors.forEach((color) => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.style.backgroundColor = 'blue';
    tileElement.setAttribute('data-tile-id', color); // Utiliser la couleur comme data-tile-id
    tileElement.addEventListener('click', () => {
        clic(tileElement);
    });
    gameContainer?.appendChild(tileElement);
});
}
init();
// Afficher le plateau de jeu avec un bouton de démarrage
let startButton = document.querySelector("#startbutton") as HTMLButtonElement;

startButton.addEventListener("click", () => {
    startButton.remove();
    gameContainer?.classList.remove("hidden-visibility");
    StartCompteur = true; // Démarrer le compteur
    secondes = 0;
});




// Relance la partie quand le bouton est cliqué
restartButton.addEventListener("click", () => {
    wonTiles = [];
    secondes = 0
    chrono = 0
    compteur = 0;
    compteurContainer.innerText = "";
    compteurContainer.classList.add("hidden");
    restartButton.style.display = "none";
    gameContainer.classList.remove("less-opacity");
    const findTiles = document.querySelectorAll(".tile");
    findTiles?.forEach ( tile => tile.remove());
    shuffleArray(tileColors);   
    init();
})