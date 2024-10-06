const grid = document.createElement('div');
grid.className = 'grille';

const formGridHeight = document.createElement('input');
formGridHeight.className = 'formGridHeight';
formGridHeight.placeholder = 'Taille de la grille';
formGridHeight.id = 'fdh';

const formPixelHeight = document.createElement('input');
formPixelHeight.className = 'formPixelHeight';
formPixelHeight.placeholder = 'Taille des pixels';
formPixelHeight.id = 'fph';

const buttonValidate = document.createElement('button');
buttonValidate.className = 'buttonValidate';
buttonValidate.textContent = 'Valider';
buttonValidate.type = 'submit';

const buttonDelete = document.createElement('button');
buttonDelete.className = 'buttonDelete';
buttonDelete.textContent = 'Réinitialiser';
buttonDelete.type = 'submit';

const header = document.createElement('header');
header.className = 'header';
header.append(formGridHeight, formPixelHeight, buttonValidate, buttonDelete);

const color1 = document.createElement('div');
color1.className = 'color1 color';

const color2 = document.createElement('div');
color2.className = 'color2 color';

const color3 = document.createElement('div');
color3.className = 'color3 color';


const palette = document.createElement('div');
palette.className = 'palette';
palette.append(color1, color2, color3);

const mainSentence = document.createElement('p');
mainSentence.className = 'mainSentence';
mainSentence.innerText = 'Grille de 5x5 avec une taille de 20 pixels générées !'

document.body.append(header, mainSentence, grid, palette,);

let currentColor = ""
let gridIsGenerated = false;

function inputChangeColor() {
    const colors = document.querySelectorAll('.color');
    colors.forEach((color) => {
        const changeColor = document.createElement('input');
        changeColor.setAttribute('type', 'color');
        changeColor.className = 'changeColor';

        color.appendChild(changeColor);
        const clickInput = changeColor.addEventListener("change", (event) => {
            let selectedColor = event.target.value;
            currentColor = selectedColor;
            color.style.backgroundColor = selectedColor;
            console.log(selectedColor);

        })
    });
}

function gridGenerator() {
    grid.innerHTML = '';
    const pixelsHeight = formPixelHeight.value;
    for (let i = 0; i < formGridHeight.value; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        

    for (let j = 0; j < formGridHeight.value; j++) {
        const colonne = document.createElement('div');
        colonne.className = 'colonne';
        colonne.style.width = Number(formPixelHeight.value) + "px";
        colonne.style.height = Number(formPixelHeight.value) + "px";
        row.appendChild(colonne);
        const clickColonne = colonne.addEventListener("click", (event) => {
            colonne.style.backgroundColor = currentColor;
        });
    }
    grid.appendChild(row);
    gridIsGenerated = true;
    
    showSentence()
    console.log(gridIsGenerated);
}
};


const validateChoice = buttonValidate.addEventListener("click", (event) => {
    event.preventDefault();
    gridGenerator();
});

const deleteGrid = buttonDelete.addEventListener("click", (event) => {
    event.preventDefault();
    gridIsGenerated = false;
    console.log(gridIsGenerated);
    grid.innerHTML = '';
    showSentence()
});

function showSentence() {
    
    if (gridIsGenerated === true) {
        mainSentence.style.visibility = 'visible';
        mainSentence.innerText = "Grille de " + formGridHeight.value + "x" + formGridHeight.value + 
        " avec une taille de " + formPixelHeight.value + " pixels générées !"
    }
    else {
        mainSentence.style.visibility = 'hidden';
    }
};


const firstColor = color1.addEventListener("click", (event) => {
    currentColor = getComputedStyle(event.target).backgroundColor;
    console.log(currentColor);
    });

const secondColor = color2.addEventListener("click", (event) => {
    currentColor = getComputedStyle(event.target).backgroundColor;
    console.log(currentColor);
    });

const thirdColor = color3.addEventListener("click", (event) => {
    currentColor = getComputedStyle(event.target).backgroundColor;
    console.log(currentColor);
    });
    
inputChangeColor();
    
