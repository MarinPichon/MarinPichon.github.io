const slateContainer = document.createElement("div");
slateContainer.className = "container";
const body = document.querySelector("body");

const containerColor = document.createElement("div");
containerColor.className = "containerColor";
const color1 = document.createElement("div");
color1.classList.add("color", "plain");

const color2 = document.createElement("div");
color2.classList.add("color", "empty");

const color3 = document.createElement("div");
color3.classList.add("color", "light");

const color4 = document.createElement("div");
color4.classList.add("color", "highlight");

containerColor.append(color1, color2, color3, color4);
body.append(slateContainer, containerColor);

let currentClass;

const app = {
  init: function () {
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "number");
    inputBox.setAttribute("placeholder", "Taille de la grille");
    inputBox.className = "inputBox";

    const inputSize = document.createElement("input");
    inputSize.setAttribute("type", "number");
    inputSize.setAttribute("placeholder", "Taille des pixels");
    inputSize.className = "inputSize";

    const button = document.createElement("button");
    button.className = "buttonValidation";
    button.textContent = "Valider";

    const form = document.querySelector(".configuration");

    form.append(inputBox, inputSize, button);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      let userChoice = inputBox.value;
      let userPixelChoice = inputSize.value;

      app.generateSlate(userChoice, userPixelChoice);
    });
  },

  generateSlate: function (userChoice, userPixelChoice) {
    slateContainer.innerHTML = "";

    for (let i = 0; i < userChoice; i++) {
      const row = document.createElement("div");
      slateContainer.append(row);
      for (let j = 0; j < userChoice; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = userPixelChoice + "px";
        cell.style.height = userPixelChoice + "px";
        row.append(cell);
        app.changeColor(cell);
      }
    }
  },

  changeColor: function (element) {
    element.addEventListener("click", function () {
      // UTILISATION DU TOGGLE POUR PASSER DU GRIS AU NOIR (ETAPE 2)
      // (element.classList.toggle("cellBlack"));

      // AJOUT D'UN EVENTLISTENER SUR CHAQUE DIV DE COULEUR, POUR MODIFIER LA VARIABLE currentClass
      color1.addEventListener("click", function () {
        currentClass = "plain";
      });

      color2.addEventListener("click", function () {
        currentClass = "empty";
      });

      color3.addEventListener("click", function () {
        currentClass = "light";
      });

      color4.addEventListener("click", function () {
        currentClass = "highlight";
      });

      element.classList.remove("plain", "empty", "light", "highlight");
      element.classList.add(currentClass);
      // CI DESSUS ON AJOUTE LA VARIABLE currentClass
      //ET ON ENLEVE TOUTES LES POSSIBLES CLASSES PRESENTES SUR LA CELLULE
      //(on remove après pour pas enlever la classe qu'on vient d'ajouter)
    });
  },
};

app.init();