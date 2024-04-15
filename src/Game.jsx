import React, { useState } from 'react'
import './Game.css'
function Square(props) {
  const isSnakeOrLadder = props.snakesAndLadders[props.index + 1]
  let letter = ''
  let squareClass = 'square'
  if (isSnakeOrLadder) {
    letter = isSnakeOrLadder > props.index + 1 ? 'L' : 'S'
    squareClass += isSnakeOrLadder > props.index + 1 ? ' ladder' : ' snake'
  }

  return (
    <div className={squareClass}>
      {props.index + 1}
      {props.position1 === props.index && (
        <div className="player-circle red"></div>
      )}
      {props.position2 === props.index && (
        <div className="player-circle blue"></div>
      )}
      {letter}
    </div>
  )
}
function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        position1={props.position1}
        position2={props.position2}
        index={i}
        snakesAndLadders={props.snakesAndLadders}
      />
    )
  }

  const boardStyle = {
    gridTemplateColumns: `repeat(10, 1fr)`,
  }

  return (
    <div style={boardStyle} className="board">
      {props.squares.map((square, i) => renderSquare(i))}
    </div>
  )
}

function Game() {
  const initialBoard = Array(100).fill(null)
  const [squares, setSquares] = useState(initialBoard)
  const [player, setPlayer] = useState(1)
  const [position, setPosition] = useState(0)
  const [score, setScore] = useState({ player1: 0, player2: 0 })
  const [position2, setPosition2] = useState(0)

  const snakesAndLadders = {
    16: 6, // Snake from 17 to 7
    47: 26, // Snake from 48 to 27
    49: 11, // Snake from 50 to 12
    56: 53, // Snake from 57 to 54
    62: 19, // Snake from 63 to 20
    64: 60, // Snake from 65 to 61
    87: 24, // Snake from 88 to 25
    93: 73, // Snake from 94 to 74
    95: 75, // Snake from 96 to 76
    98: 78, // Snake from 99 to 79
    1: 38, // Ladder from 2 to 39
    4: 14, // Ladder from 5 to 15
    9: 31, // Ladder from 10 to 32
    21: 42, // Ladder from 22 to 43
    28: 84, // Ladder from 29 to 85
    36: 44, // Ladder from 37 to 45
    51: 67, // Ladder from 52 to 68
    71: 91, // Ladder from 72 to 92
    80: 100, // Ladder from 81 to 101
  }

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1
    let newPosition = player === 1 ? position + roll : position2 + roll

    // Check if the new position has a snake or ladder
    if (snakesAndLadders[newPosition]) {
      newPosition = snakesAndLadders[newPosition]
    }

    if (player === 1) {
      setPosition(newPosition)
      setScore({ ...score, player1: newPosition })
    } else {
      setPosition2(newPosition)
      setScore({ ...score, player2: newPosition })
    }

    setPlayer(player === 1 ? 2 : 1) // Switch player

    // Check for winning condition
    if (newPosition >= 99) {
      alert(`Player ${player} wins!`)
      // Reset the game
      setPosition(0)
      setPosition2(0)
      setPlayer(1)
      setScore({ player1: 0, player2: 0 })
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          position1={position}
          position2={position2}
          snakesAndLadders={snakesAndLadders}
        />
      </div>
      <div>
        {' '}
        Score : Player 1 - {score.player1}, Player 2 - {score.player2}{' '}
      </div>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  )
}

export default Game
