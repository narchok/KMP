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
const CalculBords = async (mot) => {
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
  const row = document.getElementById("row2");
  row ? row.remove() : null;
  document.getElementById("morrisPratt").innerHTML += `<tr id="row2"></tr>`;

  for (let i = 0; i < word.length; i++) {
    document.getElementById("row2").innerHTML += `<td id=${"m-" + i}>${
      word[i]
    }</td>`;
  }
  delay =
    document.getElementById("delay").value === ""
      ? 5
      : document.getElementById("delay").value;

  console.log("Lancement du Morris Pratt");
  const tableauBords = await CalculBords(word);
  console.log("Tableau de bords:", tableauBords);

  //Algo Morris Pratt

  let textIndex = 0;
  let wordIndex = 0;
  var start = Date.now();

  let numberPositions = 0;
  const wordLength = word.length;
  while (textIndex < text.length) {
    document.getElementById(textIndex.toString()).style.backgroundColor =
      "#f4f186";
    document.getElementById(textIndex.toString()).style.borderColor = "red";
    delay > 0 ? await sleep(delay) : null;

    if (word[wordIndex] === text[textIndex]) {
      document.getElementById(
        "m-" + wordIndex.toString()
      ).style.backgroundColor = "green";

      increment ? await keyPressed() : null;

      wordIndex += 1;
      textIndex += 1;
      document.getElementById(textIndex.toString()).style.backgroundColor =
        "#f4f186";
      document.getElementById(textIndex.toString()).style.borderColor = "red";
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
        for (let i = 1; i <= wordIndex; i++) {
          document.getElementById(
            "m-" + (wordIndex + i).toString()
          ).style.backgroundColor = "white";
        }

        if (text[textIndex] != word[wordIndex]) {
          wordIndex = 0;
        }
      } else if (word[wordIndex] != text[textIndex]) {
        increment ? await keyPressed() : null;

        if (wordIndex >= 0) {
          wordIndex = tableauBords[wordIndex];
        }
        for (let i = wordLength - wordIndex; i >= 0; i--) {
          console.log("i", i);
          i != wordLength
            ? (document.getElementById(
                "m-" + i.toString()
              ).style.backgroundColor = "white")
            : null;
        }
        document.getElementById(textIndex.toString()).style.backgroundColor =
          "#f4f186";
      }
    } else {
      if (wordIndex != 0) {
        increment ? await keyPressed() : null;
        for (let i = 0; i < wordIndex; i++) {
          document.getElementById(
            "m-" + (wordIndex + i).toString()
          ).style.backgroundColor = "white";
        }
        wordIndex = tableauBords[wordIndex];
      } else {
        for (let i = 0; i < wordLength; i++) {
          document.getElementById("m-" + i.toString()).style.backgroundColor =
            "white";
        }
        textIndex += 1;
      }
    }

    document.getElementById((textIndex - 1).toString()).style.borderColor =
      "black";

    document.getElementById("time").innerHTML = Date.now() - start;
    increment ? await keyPressed() : null;
  }

  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  //console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);
  document.getElementById("totalMatchs").innerHTML = tableauOccurences.length;

  return tableauOccurences;
};

const realBrutForce = async () => {
  if (word.length <= 0 || text.length <= 0) return 0;
  delay =
    document.getElementById("delay").value === ""
      ? 5
      : document.getElementById("delay").value;
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
      ? "ATAATAATABDATTATKATATHAJTAAATABATATABDAATATTTATKATATHAJABTATHAJTATATAAATAATATABDATTATTAAATAATATABDATTATATHAJTAAATAATATABDATTATATKATATHAJTAAATAATATABTATTATATKATATHAJATAATKATATHAJATADATTATATATTATATKATATHAJATAKATATHAJATATTAAATAATATABDATATATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAA"
      : document.getElementById("text").value;
  word =
    document.getElementById("pattern").value === ""
      ? "AATAA"
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
