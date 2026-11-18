import test from 'node:test';
import assert from 'node:assert';
import { calculateWinner, emptyBoard, isDraw, otherPlayer, play, status } from '../lib/game.js';

const board = (s) => s.split('').map((c) => (c === '-' ? null : c));

test('empty board has no winner and is not a draw', () => {
  assert.strictEqual(calculateWinner(emptyBoard()), null);
  assert.strictEqual(isDraw(emptyBoard()), false);
});

test('detects every winning line', () => {
  const wins = ['XXX------', '---XXX---', '------XXX', 'X--X--X--', '-X--X--X-', '--X--X--X', 'X---X---X', '--X-X-X--'];
  for (const w of wins) assert.strictEqual(calculateWinner(board(w)).winner, 'X', w);
});

test('reports the winning line so the UI can highlight it', () => {
  assert.deepStrictEqual(calculateWinner(board('OOO-X-X--')).line, [0, 1, 2]);
});

test('detects a draw', () => {
  assert.strictEqual(isDraw(board('XOXXOOOXX')), true);
  assert.strictEqual(calculateWinner(board('XOXXOOOXX')), null);
});

test('a full board with a winner is not a draw', () => {
  assert.strictEqual(isDraw(board('XXXOOXOXO')), false);
});

test('play places a mark and does not mutate the old board', () => {
  const b = emptyBoard();
  const n = play(b, 4, 'X');
  assert.strictEqual(n[4], 'X');
  assert.strictEqual(b[4], null);
});

test('play ignores a taken square, a bad index and moves after a win', () => {
  const taken = board('X--------');
  assert.strictEqual(play(taken, 0, 'O'), taken);
  assert.strictEqual(play(taken, 9, 'O'), taken);
  const won = board('XXX-OO---');
  assert.strictEqual(play(won, 8, 'O'), won);
});

test('status text covers next player, winner and draw', () => {
  assert.strictEqual(status(emptyBoard(), 'X'), 'Next player: X');
  assert.strictEqual(status(board('XXX-OO---'), 'O'), 'Winner: X');
  assert.strictEqual(status(board('XOXXOOOXX'), 'X'), "It's a draw");
});

test('otherPlayer alternates', () => {
  assert.strictEqual(otherPlayer('X'), 'O');
  assert.strictEqual(otherPlayer('O'), 'X');
});
