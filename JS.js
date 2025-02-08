const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let tiles;
        let firstTile = null;
        let secondTile = null;
        let lockBoard = false;

        function initializeGame() {
            tiles = [...letters, ...letters];
            tiles.sort(() => Math.random() - 0.5);
            const grid = document.getElementById("gameGrid");
            grid.innerHTML = "";
            
            tiles.forEach(letter => {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.letter = letter;
                tile.textContent = "";
                
                tile.addEventListener("click", () => {
                    if (lockBoard || tile.classList.contains("revealed") || tile.classList.contains("matched")) return;
                    
                    tile.textContent = letter;
                    tile.classList.add("revealed");
                    
                    if (!firstTile) {
                        firstTile = tile;
                    } else {
                        secondTile = tile;
                        lockBoard = true;
                        setTimeout(checkMatch, 800);
                    }
                });
                
                grid.appendChild(tile);
            });
        }

        function checkMatch() {
            if (firstTile.dataset.letter === secondTile.dataset.letter) {
                firstTile.classList.add("matched");
                secondTile.classList.add("matched");
            } else {
                firstTile.textContent = "";
                secondTile.textContent = "";
                firstTile.classList.remove("revealed");
                secondTile.classList.remove("revealed");
            }
            firstTile = null;
            secondTile = null;
            lockBoard = false;
            checkWin();
        }

        function checkWin() {
            if (document.querySelectorAll(".matched").length === tiles.length) {
                document.getElementById("restartBtn").style.display = "block";
            }
        }

        function restartGame() {
            document.getElementById("restartBtn").style.display = "none";
            firstTile = null;
            secondTile = null;
            lockBoard = false;
            initializeGame();
        }

        initializeGame();