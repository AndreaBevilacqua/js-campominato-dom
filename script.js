// Recupero gli elementi dal dom
const grid = document.getElementById('grid');
const button = document.querySelector('button');
const scoreDisplay = document.getElementById('score');

// ~ Funzioni generali

const startGame = event => {

    // ! Impedisco il reload della pagina
    if (event) event.preventDefault();
}

// ~ Funzioni specifiche

    // Funzione per generare la cella 
    const createCell = cellNumber => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.append(cellNumber);
        return cell;
    }

    const generateBombs = (maxBombNumber, totalBombs) => {
        const bombs = [];
        while (bombs.lenght < totalBombs) {
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

    
// ^ --------------------
// ^ OPERAZIONI INIZIALI
// ^ --------------------

// Cambio il testo del bottone
button.innerText = 'Rigioca';

// Svuota il contenuto 
grid.innerText = '';

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

// ~ ----------------------
// ~  SVOLGIMENTO ESERCIZIO
// ~ ----------------------

for (let i = 1; i <= totalCells; i++) {
    // Creo una cella
    const cell = createCell(i);
    
    // Rendo la cella cliccabile
    cell.addEventListener('click', () => {

        // ! Controlla se la cella é stata cliccata 
        if (cell.classList.contains('clicked')) return;

        // Aggiungo la classe clicked
        cell.classList.add('clicked');

        // Stampo il numero in console con ún messaggio appropriato 
        console.log(`Hai cliccato la cella numero ${i}`);

        // Controllo se é stata cliccata una cella 
        const isBombClicked = bombs.includes(i);

        // Controllo se l'utente ha perso o vinto'
        if(isBombClicked) {
            gameOver(score, bombs, false)
        } else {
            scoreDisplay.innerText = ++score;

            if (score === maxPoints){
                endGame(score, bombs, true)
            }
        }
    }
    );
        grid.appendChild(cell);
}
    

// ! =====================
// ! PER INIZIARE IL GIOCO
// ! =====================

button.addEventListener('click', startGame);
