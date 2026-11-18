// Pure game rules, kept free of React so they are easy to test.
export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export const emptyBoard = () => Array(9).fill(null);

// Returns { winner: 'X' | 'O', line: [a, b, c] } or null.
export function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export const isDraw = (squares) => !calculateWinner(squares) && squares.every(Boolean);

// Returns a new board with the move applied, or the same board if the move is not allowed.
export function play(squares, index, player) {
  if (index < 0 || index > 8 || squares[index] || calculateWinner(squares)) return squares;
  const next = squares.slice();
  next[index] = player;
  return next;
}

export const otherPlayer = (player) => (player === 'X' ? 'O' : 'X');

export function status(squares, next) {
  const result = calculateWinner(squares);
  if (result) return `Winner: ${result.winner}`;
  if (isDraw(squares)) return "It's a draw";
  return `Next player: ${next}`;
}
