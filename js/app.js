/*--------------------- Constants ------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')

/*------------------ Variables (state) ------------*/

let board
let turn
let winner
let tie

/*------------ Cached Element References ---------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*----------------- Functions ------------------*/

function init() {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

init()

function render() {
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach((event, idx) => {
    squareEls[idx].textContent = event
  })
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} wins!`
  } else if (tie) {
    messageEl.textContent = `It's a tie!`
  } else {
    messageEl.textContent = `It's ${turn}'s turn!`
  }
}

function addHoverEffect() {
  squareEls.forEach((square) => {
    square.classList.remove('hover-x', 'hover-o')

    if (!square.textContent) {
      if (turn === 'X') {
        square.classList.add('hover-x')
      } else {
        square.classList.add('hover-o')
      }
    }
  })
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id)

  if (board[squareIndex] || winner) return

  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

function placePiece(index) {
  board[index] = turn
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true
    }
  })
}

function checkForTie() {
  if (!winner && board.every((sqr) => sqr)) {
    tie = true
  }
}

function switchPlayerTurn() {
  if (!winner) {
    turn = turn === 'X' ? 'O' : 'X'
  }
}
/*------------- Event Listeners ----------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})

const resetBtnEl = document.getElementById('reset')
resetBtnEl.addEventListener('click', init)
