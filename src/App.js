import React from 'react'
import { useState } from 'react';
import './App.css';
import Square from './components/Square';
import CalculateWinner from './components/CalculateW';



function Game() {
      const [xIsNext, setXIsNext] = useState(false);
      const [history, setHistory] = useState([Array(9).fill(null)]);
      const [currentMove, setCurrentMove] = useState(0);
      const currentSquares = history[currentMove];
   
  
  function handlePlay(nextSquares) {
   const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setXIsNext(!xIsNext);
    }
   
  
     function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
     }
  const resetGame = () => {
    setXIsNext(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Move:' + move;
      
    } else {
      description = 'Game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        
        <ol>{moves}</ol>
      </div>
      <div>    <button onClick={resetGame}>Reset</button></div>
    </div>

  )
}

function Board({ xIsNext, squares, onPlay }) {
  
  function handleClick(i) {
 
   if (CalculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }


  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  
  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
       <div className="status">{status}</div>
       <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square  value={squares[2]} onSquareClick={() => handleClick(2)}/>
        
      </div>
      <div className="board-row">
        <Square  value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square  value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square  value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square  value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square  value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square  value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>  

    

  )
}

export default Game;