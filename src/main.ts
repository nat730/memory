// Définir une classe Tile pour représenter chaque tuile
class Tile {
    public id: number;
    public value: string;
    public flipped: boolean;

    constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
        this.flipped = false;
    }
}

// Mélanger un tableau en utilisant l'algorithme Fisher-Yates (sources : https://fr.wikipedia.org/wiki/Mélange_de_Fisher-Yates)
function shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Créer un tableau de valeurs de tuiles
const tileValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Mélanger les valeurs de tuiles
shuffleArray(tileValues);

// Créer un tableau d'objets Tuile
const tiles: Tile[] = tileValues.map((value, index) => new Tile(index, value));

// Créer un conteneur pour le plateau de jeu
const gameContainer = document.querySelector('#game-container');    

// Créer et afficher les tuiles sur le plateau de jeu
tiles.forEach(tile => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.dataset.id = tile.id.toString();
    tileElement.innerText = tile.value;
    gameContainer?.appendChild(tileElement);

    });