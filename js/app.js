const app = {

// Variables d'état de l'application
palette : document.createElement('div'),
currentColor : '',
gridIsGenerated : false,
mainSentence : document.createElement('p'),
grid : document.createElement('div'),

// Fonction permettant de créer un élément HTML avec différentes propriétés
createElement(element, type, name = '', className = '', placeholder = '', value = '') {
const elem = document.createElement(element);
elem.type = type;
elem.name = name;
elem.className = className;
elem.placeholder = placeholder;
elem.value = value;

return elem;
},

// Crée le header avec les champs de saisie et les boutons, puis ajoute ces éléments au body
createHeader() {
const header = document.createElement('header');
header.className = 'header';
const formGridHeight = app.createElement('input', 'number', 'formGridHeight', 'formGridHeight', 'Taille De La Grille');
const formPixelHeight = app.createElement('input', 'number', 'formPixelHeight', 'formPixelHeight', 'Taille Des Pixels');
const buttonValidate = app.createElement('button', 'submit', 'buttonValidate', 'buttonValidate');
buttonValidate.textContent = 'Valider';
const buttonDelete = app.createElement('button', 'submit', 'buttonDelete', 'buttonDelete');
buttonDelete.textContent = 'Réintialiser';

header.append(formGridHeight, formPixelHeight, buttonValidate, buttonDelete);
document.body.append(header);

buttonValidate.addEventListener('click', (event) => {
    event.preventDefault();
    
    let formGridHeight = parseInt(header.querySelector('input[name=formGridHeight]').value, 10);
    let formPixelHeight = parseInt(header.querySelector('input[name=formPixelHeight]').value, 10);

    // Si les deux champs sont incorrects, on affiche un message et réinitialise la grille
    if (isNaN(formGridHeight) && isNaN(formPixelHeight)) {
        alert('Veuillez saisir un chiffre ou nombre pour les deux champs de saisie.');
        app.gridIsGenerated = false;
        return;  // Stoppe l'exécution ici si les deux champs sont incorrects
    }
    // Si la taille de la grille est incorrecte, on affiche un message et réinitialise la grille
    else if (isNaN(formGridHeight)) {
        alert('Veuillez saisir un chiffre ou nombre pour le champ de la taille de la grille.');
        app.gridIsGenerated = false;
        return;  // Stoppe l'exécution ici si seulement la taille de la grille est incorrecte
    }
    // Si la taille des pixels est incorrecte, on affiche un message et réinitialise la grille
    else if (isNaN(formPixelHeight)) {
        alert('Veuillez saisir un chiffre ou nombre pour le champ de la taille des pixels.');
        app.gridIsGenerated = false;
        
        return;  // Stoppe l'exécution ici si seulement la taille des pixels est incorrecte
    }
    // Appelle la fonction gridGenerator avec les valeurs de taille de la grille et des pixels
    app.gridGenerator(formGridHeight, formPixelHeight);

    header.querySelector('input[name=formGridHeight]').value = '';
    header.querySelector('input[name=formPixelHeight]').value = '';    
    
});
// On passe le boutonDelete à la fonction deleteGrid afin de pouvoir l'utiliser
app.deleteGrid(buttonDelete);
},

gridGenerator(formGridHeight = app.formGridHeight, formPixelHeight = app.formPixelHeight) {
app.mainSentence.className = "mainSentence";
app.mainSentence.innerText = "Grille de 5x5 avec une taille de 20 pixels générée !"
app.grid.className = "grille";
app.resetGrid();
for (let i = 0; i < formGridHeight; i++) {
    const row = document.createElement('div');
    row.className = 'row';

for (let j = 0; j < formGridHeight; j++) {
    const colonne = document.createElement('div');
    colonne.className = 'colonne';
    colonne.style.height = formPixelHeight + 'px';
    colonne.style.width = formPixelHeight + 'px';
    row.appendChild(colonne);
    const clickColonne = colonne.addEventListener("click", (event) => {
        colonne.style.backgroundColor = app.currentColor;
    });
}
app.grid.appendChild(row);
}
app.gridIsGenerated = true;
document.body.append(app.mainSentence, app.grid);
app.showSentence(formGridHeight, formPixelHeight);
},

inputChangeColor() {
    const colors = document.querySelectorAll('.color');
    colors.forEach((color) => {
        const changeColor = document.createElement('input');
        changeColor.setAttribute('type', 'color');
        changeColor.className = 'changeColor';
        changeColor.style.display = 'none';
        
        const customButtons = app.createElement('button', '', '', 'customButtons');
        customButtons.style.backgroundColor = getComputedStyle(color).backgroundColor;

        color.appendChild(changeColor);
        color.appendChild(customButtons);

        customButtons.addEventListener('click', (event) => {
            changeColor.click();
        })

        const clickInput = changeColor.addEventListener("change", (event) => {
            let selectedColor = event.target.value;
            app.currentColor = selectedColor;
            color.style.backgroundColor = selectedColor;
            customButtons.style.backgroundColor = selectedColor;
        })
    });
},

createPalette() {
const color1 = document.createElement('div')
color1.className = 'color1 color';
const color2 = document.createElement('div')
color2.className = 'color2 color';
const color3 = document.createElement('div')
color3.className = 'color3 color';
const palette = document.createElement('div');
palette.className = 'palette';
document.body.append(palette);
palette.append(color1, color2, color3,);

const colorsListeners = [color1, color2, color3];
for (color of colorsListeners) {
    const clickColor = color.addEventListener('click', (event) => {
        app.currentColor = getComputedStyle(event.target).backgroundColor;
    })
}
},

resetGrid() {
app.grid.innerHTML = '';
},

deleteGrid(buttonDelete) {
buttonDelete.addEventListener('click', (event) => {
    event.preventDefault();
    app.gridIsGenerated = false;
    app.grid.innerHTML = '';
    app.showSentence();
})
},

showSentence(formGridHeight = app.formGridHeight, formPixelHeight = app.formPixelHeight) {
    if (app.gridIsGenerated === true) {
        app.mainSentence.style.visibility = 'visible';
        app.mainSentence.innerText = "Grille de " + formGridHeight + "x" + formGridHeight +
        " avec une taille de " + formPixelHeight + " pixels générée !"
    }
    else {
        app.mainSentence.style.visibility = 'hidden';
    }
},

init() {
    app.createHeader();
    app.gridIsGenerated = false;
    app.createPalette();
    app.inputChangeColor();   
}
};

document.addEventListener('DOMContentLoaded', function() {
    app.init();
});