// ton code ici
const grille = document.createElement('div');
grille.className = 'grille';

const body = document.querySelector('body');
body.append(grille);

function generationGrille(userChoice) {

    for (let i = 0 ; i < userChoice; i++){
        const row = document.createElement('div');
        grille.append(row);
        
    for (let j =0 ; j < userChoice; j++) {
        const colonne = document.createElement('div');
        row.append(colonne);
        }
    }
}


