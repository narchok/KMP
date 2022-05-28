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

//const fs = require("fs");
let word = "";
let text = "";
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
  for (let i = 0; i < td.length; i++) {
    td[i].style.backgroundColor = "white";
  }
};
//Retourne un tableau de position des occurences
async function morrisPratt() {
  //construction tableau de bords
  cleanRow();
  let tableauOccurences = [];
  console.log("Lancement du Morris Pratt");
  const tableauBords = CalculBords(word);
  console.log("Tableau de bords:", tableauBords);

  //Algo Morris Pratt

  let textIndex = 0;
  let wordIndex = 0;
  var start = Date.now();

  /* while (textIndex < text.length) {
    if (word[wordIndex] === text[textIndex]) {
      wordIndex += 1;
      textIndex += 1;
    }
    if (wordIndex === word.length) {
      //console.log("Occurence en position,", textIndex - wordIndex);
      tableauOccurences.push(textIndex - wordIndex);
      wordIndex = tableauBords[wordIndex];
    } else if (textIndex < text.length && word[wordIndex] != text[textIndex]) {
      if (wordIndex != 0) {
        wordIndex = tableauBords[wordIndex];
      } else {
        textIndex += 1;
      }
    }
  } */

  console.log("hello");
  let numberPositions = 0;
  const wordLength = word.length;
  while (textIndex < text.length) {
    if (word[wordIndex] === text[textIndex]) {
      document.getElementById(textIndex.toString()).style.backgroundColor =
        "green";
      wordIndex += 1;
      textIndex += 1;
      if (wordIndex === wordLength) {
        tableauOccurences[numberPositions] = textIndex - wordIndex;
        for (let i = 0; i < word.length; i++) {
          document.getElementById(
            (textIndex - wordIndex + i).toString()
          ).style.backgroundColor = "green";
        }
        numberPositions += 1;
        wordIndex = tableauBords[wordIndex];
      } else {
        document.getElementById(
          (textIndex - 1).toString()
        ).style.backgroundColor = "yellow";
      }
    } else {
      document.getElementById(textIndex.toString()).style.backgroundColor =
        "yellow";
      wordIndex = tableauBords[wordIndex];
      if (wordIndex < 0) {
        wordIndex += 1;
        textIndex += 1;
      }
    }
    document.getElementById("time").innerHTML = Date.now() - start;

    await sleep(10);
  }
  /*  while (textIndex < text.length) {
    if (wordIndex >= 0 && word[wordIndex] != text[textIndex]) {
      wordIndex = tableauBords[wordIndex];
    } else {
      wordIndex += 1;
      textIndex += 1;
    }
    if (wordIndex === wordLength) {
      tableauOccurences.push(textIndex - wordLength);
    }
  } */

  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  //console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);
  document.getElementById("totalMatchs").innerHTML = tableauOccurences.length;

  return tableauOccurences;
}

async function brutForce() {
  //.style.backgroundColor = "white";
  cleanRow();
  if (word.length <= 0) return 0;
  console.log("Lancement Brut Force");
  var start = Date.now();
  tableauOccurences = new Array();
  var pos = 0;
  while (true) {
    document.getElementById(pos.toString()).style.backgroundColor = "yellow";
    pos = text.indexOf(word, pos);

    if (pos >= 0) {
      for (let i = 0; i < word.length; i++) {
        document.getElementById((pos + i).toString()).style.backgroundColor =
          "green";
      }
      tableauOccurences.push(pos);
      pos += 1;
    } else {
      break;
    }

    await sleep(200);
  }
  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  //console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);

  return tableauOccurences;
}
const realBrutForce = async () => {
  if (word.length <= 0 || text.length <= 0) return 0;
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
            "grey")
        : null;

      if (word[wordIndex] === text[i + j]) {
        document.getElementById((i + j).toString()).style.backgroundColor =
          "green";
        wordIndex += 1;
      }
    }
    if (wordIndex === wordLength) {
      tableauOccurences.push(i);
      wordIndex = 0;
    }
    wordIndex = 0;
    i++;
    await sleep(10);
    document.getElementById("time").innerHTML = Date.now() - start;
  }
  for (let z = 0; z < tableauOccurences.length - 1; z++) {
    for (let iz = 0; iz < word.length; iz++) {
      document.getElementById(
        (tableauOccurences[z] + iz).toString()
      ).style.backgroundColor = "forestgreen";
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

//const text = fs.readFileSync("./sequence.fasta", "utf8");
const mot2 = "ATA";

//brutForce(text, mot2);
console.log("----------");
//morrisPratt(text, mot2);

function addCode() {
  const test = document.getElementById("row");
  test ? test.remove() : null;
  text =
    document.getElementById("text").value === ""
      ? "ATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAAATAATATABDATTATKATATHAJTAA"
      : document.getElementById("text").value;
  console.log("text", text === "");
  word =
    document.getElementById("pattern").value === ""
      ? "ATA"
      : document.getElementById("pattern").value;
  for (let i = 0; i < text.length; i++) {
    document.getElementById("body").innerHTML += `<tr id="row"></tr>`;
    document.getElementById("row").innerHTML += `<td id=${i}>${text[i]}</td>`;
  }
}
window.onload = function () {
  document.body.addEventListener("keydown", function (event) {
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        str = "Left";
        break;
      case "ArrowRight":
        str = "Right";
        console.log("right");
        break;
    }
  });
};
