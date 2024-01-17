// Recupero gli elementi dal dom
const grid = document.getElementById('grid');
const button = document.getElementById('play-button');
const scoreDisplay = document.getElementById('score');

// ~ Funzioni generali

const startGame = event => {

    // Preparo il flag
    let isGameOver = false;

    // Funzione per generare la cella 
    const createCell = cellNumber => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.append(cellNumber);
        return cell;
    }

    // ~ Funzioni specifiche

    const generateBombs = (maxBombNumber, totalBombs) => {
        const bombs = [];
        while (bombs.length < totalBombs) {
            const randomNumber = Math.floor(Math.random() * maxBombNumber) + 1;
            if (!bombs.includes(randomNumber)) bombs.push(randomNumber);
        }
        return bombs;
    }

    const endGame = (score, bombs, isWin = false) => {
        const message = isWin
        ? `Hai vinto! :D`
        : `Hai perso! :C Hai totalizzato ${score}punti.`

        alert(message);
    }

    //  ~ ----------------------
    //  ~  SVOLGIMENTO ESERCIZIO
    //  ~ ----------------------

    // Cambio il testo del bottone
    button.innerText = 'Rigioca';

    // Svuota il contenuto 
    grid.innerText = '';

    // ^ --------------------
    // ^ OPERAZIONI INIZIALI
    // ^ --------------------

    //  Dati per la griglia e le bombe all'interno
    const rows = 10;
    const cols = 10;
    let totalBombs = 16;
    const totalCells = rows * cols;

    // Assegno una variabile per il punteggio 
    let score = 0;
    scoreDisplay.innerText = score;

    // Creo una variabile per il punteggio massimo
    const maxPoints = totalCells - totalBombs;

    // Genero le bombe attraverso una funzione
    const bombs = generateBombs(totalCells, totalBombs);

    // Genero le celle e le inserisco in pagina
    for (let i = 1; i <= totalCells; i++) {

        // Creo la cella 
        const cell = createCell(i);

        // Rendo la cella cliccabile
        cell.addEventListener('click', () => {

            
            if (isGameOver || cell.classList.contains('clicked')) return;
            cell.classList.add('clicked');
            
            console.log(i);

            const isBombClicked = bombs.includes(i);

            if(isBombClicked) {
                cell.classList.add('bomb');
              endGame(score, bombs, false)
              isGameOver = true;
              } else {
             scoreDisplay.innerText = ++score;
                
               if (score === maxPoints){
               endGame(score, bombs, true)
             }
        }});

        // Inserisco la cella in pagina 
        grid.appendChild(cell);
    }

}  

// ! =====================
// ! PER INIZIARE IL GIOCO
// ! =====================

button.addEventListener('click', startGame);
