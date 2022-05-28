/* int total <-- 0;
string w;
string temp;
Pour i allant de 0 à la taille du mot-1
Faire
   temp <-- w[0] à w[i];
   Si temp est égal à (w[taille du mot - i] à w[taille du mot - 1]); 
      total <-- total + 1;
   FinSi
Fin

*/

let word = "";
let text = "";
let increment = false;
let delay = 5;
const NombreBords = () => {
  let total = 0;
  let tempStart = "";
  let tempEnd = "";
  console.log("Lancement du Brut Force...");
  for (let i = 0; i < mot.length - 1; i++) {
    tempStart = mot.slice(0, i);
    tempEnd = mot.slice(mot.length - i, mot.length);
    if (tempStart === tempEnd) {
      console.log(tempEnd === "" ? "Ɛ" : tempEnd);
      total++;
    }
  }

  console.log("Nombre de bords:", total);
};
const CalculBords = (mot) => {
  let i = 0;
  let j = 1;
  let tableauBords = [mot.length + 1];
  tableauBords[0] = -1;
  while (j <= mot.length - 1) {
    tableauBords[j] = i;
    while (i >= 0 && mot[i] != mot[j]) {
      i = tableauBords[i];
    }
    i += 1;
    j += 1;
  }
  tableauBords[mot.length] = i;
  return tableauBords;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cleanRow = () => {
  let td = document.getElementsByTagName("td");
  document.getElementById("time").innerHTML = "";
  document.getElementById("totalMatchs").innerHTML = "";
  for (let i = 0; i < td.length; i++) {
    td[i].style.backgroundColor = "white";
  }
};
//Retourne un tableau de position des occurences

const morrisPratt = async () => {
  //construction tableau de bords
  cleanRow();
  let tableauOccurences = [];
  delay =
    document.getElementById("delay").value === ""
      ? 5
      : document.getElementById("delay").value;

  console.log("Lancement du Morris Pratt");
  const tableauBords = CalculBords(word);
  console.log("Tableau de bords:", tableauBords);

  //Algo Morris Pratt

  let textIndex = 0;
  let wordIndex = 0;
  var start = Date.now();

  let numberPositions = 0;
  const wordLength = word.length;
  while (textIndex < text.length) {
    if (word[wordIndex] === text[textIndex]) {
      document.getElementById(textIndex.toString()).style.backgroundColor =
        "#ACD1AF";
      wordIndex += 1;
      textIndex += 1;
      if (wordIndex === wordLength) {
        tableauOccurences[numberPositions] = textIndex - wordIndex;
        document.getElementById("totalMatchs").innerHTML =
          tableauOccurences.length;

        for (let i = 0; i < word.length; i++) {
          document.getElementById(
            (textIndex - wordIndex + i).toString()
          ).style.backgroundColor = "#ACD1AF";
        }
        numberPositions += 1;
        wordIndex = tableauBords[wordIndex];
      } else {
        document.getElementById(
          (textIndex - 1).toString()
        ).style.backgroundColor = "#f4f186";
      }
    } else {
      document.getElementById(textIndex.toString()).style.backgroundColor =
        "#f4f186";
      wordIndex = tableauBords[wordIndex];
      if (wordIndex < 0) {
        wordIndex += 1;
        textIndex += 1;
      }
    }

    document.getElementById("time").innerHTML = Date.now() - start;
    increment ? await keyPressed() : null;
    delay > 0 ? await sleep(delay) : null;
  }

  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  //console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);
  document.getElementById("totalMatchs").innerHTML = tableauOccurences.length;

  return tableauOccurences;
};

async function brutForce() {
  //.style.backgroundColor = "white";
  cleanRow();
  if (word.length <= 0) return 0;
  console.log("Lancement Brut Force");
  var start = Date.now();
  tableauOccurences = new Array();
  var pos = 0;
  while (true) {
    document.getElementById(pos.toString()).style.backgroundColor = "#f4f186";
    pos = text.indexOf(word, pos);

    if (pos >= 0) {
      for (let i = 0; i < word.length; i++) {
        document.getElementById((pos + i).toString()).style.backgroundColor =
          "#ACD1AF";
      }
      tableauOccurences.push(pos);
      pos += 1;
    } else {
      break;
    }

    await sleep(delay);
  }
  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  //console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);

  return tableauOccurences;
}

const realBrutForce = async () => {
  if (word.length <= 0 || text.length <= 0) return 0;
  delay =
    document.getElementById("delay").value === ""
      ? 5
      : document.getElementById("delay").value;
  console.log(delay, "hzhzhz", document.getElementById("delay").value);
  cleanRow();

  const wordLength = word.length;
  console.log("Lancement Real Brut Force");
  var start = Date.now();
  tableauOccurences = [];
  let wordIndex = 0;
  let i = 0;

  while (i <= text.length) {
    for (let j = 0; j < wordLength; j++) {
      i + j < text.length
        ? (document.getElementById((i + j).toString()).style.backgroundColor =
            "#f4f186")
        : null;

      if (word[wordIndex] === text[i + j]) {
        wordIndex += 1;
      }
    }
    if (wordIndex === wordLength) {
      tableauOccurences.push(i);
      document.getElementById("totalMatchs").innerHTML =
        tableauOccurences.length;

      wordIndex = 0;
    }
    wordIndex = 0;
    i++;
    delay > 0 ? await sleep(delay) : null;

    increment ? await keyPressed() : null;

    document.getElementById("time").innerHTML = Date.now() - start;
  }
  for (let z = 0; z < tableauOccurences.length; z++) {
    for (let iz = 0; iz < word.length; iz++) {
      document.getElementById(
        (tableauOccurences[z] + iz).toString()
      ).style.backgroundColor = "#ACD1AF";
    }
  }
  /*  while (i <= text.length) {
    if (text.slice(i, i + wordLength) === word) {
      tableauOccurences.push(i);
    }
    i += 1;
  } */
  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);
  document.getElementById("totalMatchs").innerHTML = tableauOccurences.length;

  return tableauOccurences;
};

function addCode() {
  const test = document.getElementById("row");
  test ? test.remove() : null;
  text =
    document.getElementById("text").value === ""
      ? "ATAATATABDATTATKATATHAJTAAATAATATABDAATATTTATKATATHAJATATHAJTATATAAATAATATABDATTATTAAATAATATABDATTATATHAJTAAATAATATABDATTATATKATATHAJTAAATAATATABTATTATATKATATHAJATAATKATATHAJATADATTATATATTATATKATATHAJATAKATATHAJATATTAAATAATATABDATATATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAA"
      : document.getElementById("text").value;
  word =
    document.getElementById("pattern").value === ""
      ? "ATA"
      : document.getElementById("pattern").value;
  document.getElementById("body").innerHTML += `<tr id="row"></tr>`;

  for (let i = 0; i < text.length; i++) {
    document.getElementById("row").innerHTML += `<td id=${i}>${text[i]}</td>`;
  }
}
const keyPressed = () => {
  return new Promise((resolve) => {
    document.addEventListener("keydown", function (event) {
      const key = event.key;
      switch (key) {
        case "ArrowRight":
          resolve();
      }
    });
  });
};
window.onload = function () {
  document.getElementById("increment").innerHTML =
    "Mode pas a pas desactivé, appuyez sur Enter pour l'activé";
  document.body.addEventListener("keydown", function (event) {
    const key = event.key;
    switch (key) {
      case "Enter":
        increment = !increment;
        document.getElementById("increment").innerHTML = increment
          ? "Mode pas à pas activé, appuyez sur Entrée pour le désactiver"
          : "Mode pas a pas desactivé, appuyez sur Entréé pour l'activé";
        break;
    }
  });
};
