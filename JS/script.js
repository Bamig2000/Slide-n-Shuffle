var bkSize = 4;
var bkNumbers = [];
var bkNumbersPattern = [];
var bkNextMove = 0;
var bkGameResult = 0;

function startGame() {
  initializeGameState();
  drawBoard();
}

function initializeGameState() {
 
  bkNumbers = Array.from({ length: bkSize * bkSize - 1 }, (_, i) => i + 1);
  FisherYates(bkNumbers);
  bkNumbers.push(0);
  bkNumbersPattern = bkNumbers.slice();
  bkNextMove = 0;
  bkGameResult = 0;
 
}

function FisherYates(arr) {
  var bkcurrentIndex = arr.length;//15
  var bktemporaryValue;
  var bkrandomIndex;

  while (bkcurrentIndex !== 0) {
    bkrandomIndex = Math.floor(Math.random() * bkcurrentIndex);
    bkcurrentIndex -= 1;

    bktemporaryValue = arr[bkcurrentIndex];
    arr[bkcurrentIndex] = arr[bkrandomIndex];
    arr[bkrandomIndex] = bktemporaryValue;
  }

  return arr;
}

function drawBoard() {
  var table = document.getElementById("bkGameboard");
  table.innerHTML = "";

  for (var i = 0; i < bkSize; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < bkSize; j++) {
      var cell = document.createElement("td");
      var number = bkNumbers[i * bkSize + j];//0*4+0//1*4+1

      if (number === 0) {
        cell.className = "bkEmpty";
        cell.textContent = "0";
      } else {
        cell.textContent = number;
      }

      cell.onclick = moveNumber;
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
}

function moveNumber() {
  var row = this.parentNode.rowIndex;
  var col = this.cellIndex;

  var index = row * bkSize + col;
  var number = bkNumbers[index];
//1 col , 3 row//3*4+1
  if (number > 0) {
    if (col > 0 && bkNumbers[index - 1] === 0) {
      //to  Move left
      swapNumbers(index, index - 1);
    } else if (row > 0 && bkNumbers[index - bkSize] === 0) {
      //to  Move up
      swapNumbers(index, index - bkSize);
    } else if (col < bkSize - 1 && bkNumbers[index + 1] === 0) {
//to move right
      swapNumbers(index, index + 1);
    } else if (row < bkSize - 1 && bkNumbers[index + bkSize] === 0) {
     // to move down
      swapNumbers(index, index + bkSize);
    }


    if (bkNumbers[index] === bkNumbersPattern[index]) {
      bkGameResult++;
    } else if (bkNumbers[index] === bkNumbersPattern[index - 1]) {
      bkGameResult--;
    }

    bkNextMove++;
    document.getElementById("bkMoves").textContent = "Moves: " + bkNextMove;
    drawBoard();
    if (bkGameResult === bkNumbers.length - 1) {
      displayVictory();
    }
  }
}

function swapNumbers(index1, index2) {
  var temp = bkNumbers[index1];
  bkNumbers[index1] = bkNumbers[index2];
  bkNumbers[index2] = temp;
}

function displayVictory() {
  var message = document.getElementById("bkVictory");
  message.textContent = "Victory!";
}


