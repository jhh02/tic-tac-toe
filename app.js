const player = (symbol) => {
  this.symbol = symbol;

  const getSymbol = () => symbol;

  return { getSymbol };
};

const gameboard = (() => {
  let positionNumber = 0;

  const createBoard = (() => {
    const $body = document.body;
    const $gameboard = document.createElement('div');
    const $msg = document.createElement('p');
    const $restart = document.createElement('button');
    $msg.classList.add('msg');
    $gameboard.classList.add('gameboard');
    $restart.classList.add('restart');
    $restart.textContent = 'RESTART';
    for (let i = 0; i < 3; i+=1) {
      for (let j = 0; j < 3; j+=1) {
        const $div = document.createElement('div');
        $div.classList.add('cell');
        $div.dataset.index = `${i}${j}`;
        $div.dataset.position = positionNumber;
        $gameboard.append($div);
        positionNumber+=1;
      }
    }

    $body.append($gameboard);
    $body.append($restart);
    $body.append($msg);

    return { $restart };
  })();

  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const setField = (index, sign) => {
    const firstIndex = parseInt(index[0], 10);
    const secondIndex = parseInt(index[1],10);
    board[firstIndex][secondIndex] = sign;
  };

  const getField = (index) => {
    if (typeof index === 'number'){
     index = String(index);
    } 
    const firstIndex = parseInt(index[0],10);
    const secondIndex = parseInt(index[1],10);
    return board[firstIndex][secondIndex];
  };

  const reset = () => {
    board.forEach((row) => {
      for (let i = 0; i < row.length; i+=1) {
         row[i] = '';
      }
    });
  };

  return { setField, getField, reset, board, createBoard };
})();

const gameController = (() => {
  const makeRandomNum = () => Math.floor(Math.random() * 3);
  const playerO = player('O');
  const playerX = player('X');
  let gameOver = false;
  const compTurn = false;
  let round = 1;

  const reset = () => {
    gameOver = false;
    round = 1;
  };

  const computerPos = (compIndex) => {
    const computerIndex = `${compIndex[0]  }${  compIndex[1]}`;
    for (let i = 0; i < displayController.$fieldElements.length; i+=1) {
      if (displayController.$fieldElements[i].dataset.index === computerIndex) {
        return i;
      }
    }
  };

  const checkSetEmpty = () => {
    let row = makeRandomNum();
    let col = makeRandomNum();
    const computerIndex = [row, col];

    while (gameboard.getField(`${row}${col}`) && round < 9) {
      row = makeRandomNum();
      col = makeRandomNum();
      [row, col] = computerIndex;
    }
    return computerIndex;
  };

  const setCompField = (row, col) => {
    gameboard.setField(`${row}${col}`, getCurrentSymbol());
  };

  const checkWinner = (fieldPosition) => {
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [6, 4, 2],
      [0, 4, 8],
    ];

    return winningCondition
      .filter((combintation) => combintation.includes(fieldPosition))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) =>
            displayController.$fieldElements[index].textContent ===
            getCurrentSymbol()
        )
      );
  };

  const playRound = (fieldIndex) => {
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentSymbol());
      gameOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMessage('Draw');
      gameOver = true;
      return;
    }
    round+=1;
    displayController.setMessageElement(`Player ${getCurrentSymbol()}'s turn'`);
  };

  const isGameOver = () => gameOver;

  const isPlayerTurn = () => false;

  const isCompTurn = () =>  true;

  const getCurrentSymbol = () => round % 2 === 0 ? playerX.getSymbol() : playerO.getSymbol();

  return {
    isGameOver,
    getCurrentSymbol,
    playRound,
    reset,
    checkSetEmpty,
    setCompField,
    isCompTurn,
    isPlayerTurn,
    computerPos,
  };
})();


const displayController = (() => {
  const $fieldElements = Array.from(document.querySelectorAll('.cell'));
  const $messageElement = document.querySelector('.msg');

  const setResultMessage = (winner) => {
    if (winner === 'Draw') {
      setMessageElement("It's a draw!");
    } else {
      setMessageElement(`${winner} has won!`);
    }
  };

  const setMessageElement = (msg) => {
    $messageElement.textContent = msg;
  };

  const reset = () => {
    $fieldElements.forEach((grid) => {
      grid.textContent = '';
    });
  };

  gameboard.createBoard.$restart.addEventListener('click', () => {
    gameboard.reset();
    gameController.reset();
    reset();
    setMessageElement(`Player O turn`);
  });

  const updateBoard = (element, currentSymbol) => {
    gameboard.setField(element.dataset.index, currentSymbol);
    element.textContent = currentSymbol;
  };

  const displayCompField = (computerIndex, sign) => {
    $fieldElements.forEach((field) => {
      if (
        field.dataset.index ===
        `${computerIndex[0]  }${  String(computerIndex[1])}`
      )
        field.textContent = sign;
    });
  };

  $fieldElements.forEach((field) =>
    field.addEventListener('click', (e) => {
      if (field.textContent !== '' || gameController.isGameOver()) return;
      updateBoard(e.target, gameController.getCurrentSymbol());
      gameController.playRound(parseInt(e.target.dataset.position,10));

      const compIndex = gameController.checkSetEmpty();

      if (compIndex && gameController.isCompTurn()) {
        gameController.setCompField(compIndex[0], compIndex[1]);
        displayCompField(compIndex, gameController.getCurrentSymbol());
        gameController.isPlayerTurn();
        gameController.playRound(gameController.computerPos(compIndex));
      }
    })
  );

  return { setMessageElement, setResultMessage, updateBoard, $fieldElements };
})();


// implement different ai level
// styling => clean outer lines
