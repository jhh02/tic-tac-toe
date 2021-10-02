let count = 0;

const Gameboard = (() => {
  const boardData = [[], [], []];
  const createNewBoard = () => {
    const $body = document.body;
    const $gameboard = document.createElement("div");
    $gameboard.classList.add("gameboard");
    for (let i = 0; i < 3; i++) {
      const $div = document.createElement("div");
      if (i === 0) {
        $div.classList.add("l", "cell", "top", `${i}`);
      } else if (i === 1) {
        $div.classList.add("m", "cell", "top", `${i}`);
      } else {
        $div.classList.add("r", "cell", "top", `${i}`);
      }
      $gameboard.append($div);
    }
    for (let i = 0; i < 3; i++) {
      const $div = document.createElement("div");
      if (i === 0) {
        $div.classList.add("l", "cell", "mid", `${i}`);
      } else if (i === 1) {
        $div.classList.add("m", "cell", "mid", `${i}`);
      } else {
        $div.classList.add("r", "cell", "mid", `${i}`);
      }
      $gameboard.append($div);
    }
    for (let i = 0; i < 3; i++) {
      const $div = document.createElement("div");
      if (i === 0) {
        $div.classList.add("l", "cell", "bot", `${i}`);
      } else if (i === 1) {
        $div.classList.add("m", "cell", "bot", `${i}`);
      } else {
        $div.classList.add("r", "cell", "bot", `${i}`);
      }
      $gameboard.append($div);
    }
    $body.append($gameboard);
  };

  return { createNewBoard, boardData };
})();

const player = (symbol) => {
  const $grids = Array.from(document.querySelectorAll(".cell"));
  const playerSymbol = symbol;
  const computerSymbol = "X";
  const getSymbol = (symbol) => symbol;

  const computerMakeRandomNum = () => Math.floor(Math.random() * 3);

  const compMove = () => {
    let firstIndex = computerMakeRandomNum();
    let secondIndex = computerMakeRandomNum();

    while (Gameboard.boardData[firstIndex][secondIndex]) {
      firstIndex = computerMakeRandomNum();
      secondIndex = computerMakeRandomNum();
      $grids.forEach((grid) => {
        grid.textContent ? count++ : 0;
      });
      if (count === 9) {
        break;
      }
      count = 0;
    }

    Gameboard.boardData[firstIndex][secondIndex] = getSymbol(computerSymbol);

    if (firstIndex === 0) {
      if (secondIndex === 0) {
        $grids[0].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 1) {
        $grids[1].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 2) {
        $grids[2].textContent = getSymbol(computerSymbol);
      }
    }
    if (firstIndex === 1) {
      if (secondIndex === 0) {
        $grids[3].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 1) {
        $grids[4].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 2) {
        $grids[5].textContent = getSymbol(computerSymbol);
      }
    }
    if (firstIndex === 2) {
      if (secondIndex === 0) {
        $grids[6].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 1) {
        $grids[7].textContent = getSymbol(computerSymbol);
      }
      if (secondIndex === 2) {
        $grids[8].textContent = getSymbol(computerSymbol);
      }
    }
  };

  function move(e) {
    const index = e.target;
    if (this.textContent) return;
    this.textContent = getSymbol(playerSymbol);
    this.classList.add(getSymbol(playerSymbol));

    boardDB(index);
    setTimeout(compMove, 1000);
  }

  const boardDB = (index) => {
    if (index.classList.contains("top")) {
      if (index.classList.contains("l")) {
        Gameboard.boardData[0][0] = getSymbol(playerSymbol);
      } else if (index.classList.contains("m")) {
        Gameboard.boardData[0][1] = getSymbol(playerSymbol);
      } else {
        Gameboard.boardData[0][2] = getSymbol(playerSymbol);
      }
    }
    if (index.classList.contains("mid")) {
      if (index.classList.contains("l")) {
        Gameboard.boardData[1][0] = getSymbol(playerSymbol);
      } else if (index.classList.contains("m")) {
        Gameboard.boardData[1][1] = getSymbol(playerSymbol);
      } else {
        Gameboard.boardData[1][2] = getSymbol(playerSymbol);
      }
    }
    if (index.classList.contains("bot")) {
      if (index.classList.contains("l")) {
        Gameboard.boardData[2][0] = getSymbol(playerSymbol);
      } else if (index.classList.contains("m")) {
        Gameboard.boardData[2][1] = getSymbol(playerSymbol);
      } else {
        Gameboard.boardData[2][2] = getSymbol(playerSymbol);
      }
    }
  };

  function draw() {
    $grids.forEach((grid) => {
      if (grid.textContent === "") {
        grid.addEventListener("click", move);
      }
    });
  }
  return { draw };
};

const playGame = (() => {
  let gameOver = false;
  Gameboard.createNewBoard();
  const user = player("O");
  user.draw()


  // Check gameover
  // every grid is marked && winningCondition
  // const winningCondition() {
  //     if(Gameboard.boardData[0][0] === player1 )
  // }
})();
