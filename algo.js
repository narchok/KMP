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

const fs = require("fs");

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

//Retourne un tableau de position des occurences
const morrisPratt = (text, word) => {
  //construction tableau de bords
  let tableauOccurences = [];
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
      wordIndex += 1;
      textIndex += 1;
      if (wordIndex === wordLength) {
        tableauOccurences[numberPositions] = textIndex - wordIndex;
        numberPositions += 1;
        wordIndex = tableauBords[wordIndex];
      }
    } else {
      if (wordIndex != 0) {
        wordIndex = tableauBords[wordIndex];
      } else {
        textIndex += 1;
      }
    }
  }

  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);

  return tableauOccurences;
};

const brutForce = (text, word) => {
  if (word.length <= 0 || text.length <= 0) return 0;

  const wordLength = word.length;
  console.log("Lancement Real Brut Force");
  var start = Date.now();
  tableauOccurences = [];
  let wordIndex = 0;
  let i = 0;

  while (i <= text.length) {
    for (let j = 0; j < wordLength; j++) {
      if (word[wordIndex] === text[i + j]) {
        wordIndex += 1;
      }
    }
    if (wordIndex === wordLength) {
      tableauOccurences.push(i);
      wordIndex = 0;
    }
    wordIndex = 0;
    i++;
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

  return tableauOccurences;
};
const morrisPratt2 = async (text, word) => {
  //construction tableau de bords
  let tableauOccurences = [];

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
      wordIndex += 1;
      textIndex += 1;

      if (wordIndex === wordLength) {
        tableauOccurences[numberPositions] = textIndex - wordIndex;
        numberPositions += 1;

        wordIndex = tableauBords[wordIndex];
      } else if (word[wordIndex] != text[textIndex]) {
        if (wordIndex >= 0) {
          wordIndex = tableauBords[wordIndex];
        }
      }
    } else {
      if (wordIndex != 0) {
        wordIndex = tableauBords[wordIndex];
      } else {
        textIndex += 1;
      }
    }
  }

  var end = Date.now();
  console.log("Temps d'éxécution:", end - start, "ms");
  console.log("Tableau des occurences:", tableauOccurences);
  console.log("Nombre d'occurences:", tableauOccurences.length);

  return tableauOccurences;
};
const mot = "ATAATATA";
const text = fs.readFileSync("./sequence.fasta", "utf8");
console.log("----------");
brutForce(text, mot);
console.log("----------");
morrisPratt(text, mot);
