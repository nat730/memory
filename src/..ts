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