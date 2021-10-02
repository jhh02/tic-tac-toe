const Gameboard = (() => {
  const BOARD_DATA = [[], [], []];

  const createNewBoard = () => {
    const $body = document.body;
    const $gameboard = document.createElement("div");
    const $result = document.createElement("div");
    $gameboard.classList.add("gameboard");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $div = document.createElement("div");
        $div.classList.add("cell", `${i}${j}`);
        $gameboard.append($div);
      }
    }
    $body.append($gameboard);
    $body.append($result);
  };

  return { createNewBoard, BOARD_DATA };
})();

const player = (symbol) => {
  const $grids = Array.from(document.querySelectorAll(".cell"));
  const PLAYER_SYMBOL = symbol;
  const COMPUTER_SYMBOL = "X";
  const getSymbol = (symbol) => symbol;
  const makeRandomNum = () => Math.floor(Math.random() * 3);
  let COMP_COL = makeRandomNum();
  let COMP_ROW = makeRandomNum();
  const { BOARD_DATA } = Gameboard;

  function compMove() {
    while (BOARD_DATA[COMP_ROW][COMP_COL]) {
      COMP_ROW = makeRandomNum();
      COMP_COL = makeRandomNum();
      let count = 0;
      $grids.forEach((grid) => {
        grid.textContent ? count++ : 0;
      });
      if (count === 9) {
        break;
      }
      count = 0;
    }

    BOARD_DATA[COMP_ROW][COMP_COL] = getSymbol(COMPUTER_SYMBOL);

    $grids.forEach((grid) => {
      if (
        !grid.textContent &&
        grid.classList.contains(`${COMP_ROW}${COMP_COL}`)
      ) {
        grid.textContent = getSymbol(COMPUTER_SYMBOL);
      }
    });
  }

  const boardDB = (index) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (index.classList.contains(`${i}${j}`)) {
          BOARD_DATA[i][j] = getSymbol(PLAYER_SYMBOL);
        }
      }
    }
  };

  function played(e) {
    if (this.textContent) return;
    this.textContent = getSymbol(PLAYER_SYMBOL);
    this.classList.add(getSymbol(PLAYER_SYMBOL));
    boardDB(this);
    compMove.apply(this);
    // checkWinner();
  }
  function start() {
    $grids.forEach((grid) => grid.addEventListener("click", played));
  }

  return { start, played };
};

const game = (() => {
  let gameOver = false;
  const AI_LEVEL = ["easy", "unbeatable"];

  const checkWinner = (playerSym, computerSym) => {};

  Gameboard.createNewBoard();
  const user = player("O");
  user.start();
  //



  // Check gameover
  // every grid is marked && winningCondition

  // const winningCondition() {
  //     if(Gameboard.BOARD_DATA[0][0] === player1 )
  // }
  return { checkWinner };
})();
