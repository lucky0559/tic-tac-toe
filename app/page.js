'use client';

import { useState } from 'react';
import { calculateWinner, emptyBoard, isDraw, otherPlayer, play, status } from '../lib/game.js';

function Square({ value, onClick, highlight, disabled, label }) {
  return (
    <button
      type="button"
      className={`square${highlight ? ' win' : ''}${value ? ` mark-${value}` : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {value}
    </button>
  );
}

export default function Page() {
  const [squares, setSquares] = useState(emptyBoard());
  const [next, setNext] = useState('X');
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const result = calculateWinner(squares);
  const over = Boolean(result) || isDraw(squares);

  function handleClick(i) {
    const board = play(squares, i, next);
    if (board === squares) return;
    setSquares(board);
    setNext(otherPlayer(next));

    const won = calculateWinner(board);
    if (won) setScore((s) => ({ ...s, [won.winner]: s[won.winner] + 1 }));
    else if (isDraw(board)) setScore((s) => ({ ...s, draws: s.draws + 1 }));
  }

  function restart() {
    setSquares(emptyBoard());
    setNext('X');
  }

  return (
    <main className="wrap">
      <h1>Tic-Tac-Toe</h1>
      <p className="status" role="status" aria-live="polite">{status(squares, next)}</p>

      <div className="board" role="group" aria-label="Game board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            highlight={result?.line.includes(i)}
            disabled={over || Boolean(value)}
            label={`Square ${i + 1}${value ? `, ${value}` : ', empty'}`}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      <button type="button" className="restart" onClick={restart}>
        {over ? 'Play again' : 'Restart'}
      </button>

      <dl className="score">
        <div><dt>X</dt><dd>{score.X}</dd></div>
        <div><dt>O</dt><dd>{score.O}</dd></div>
        <div><dt>Draws</dt><dd>{score.draws}</dd></div>
      </dl>
    </main>
  );
}
