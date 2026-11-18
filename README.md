# Tic-Tac-Toe

A small two-player Tic-Tac-Toe game built with React and Next.js (App Router).

## Features
- Two players (X and O) take turns on one device
- Win and draw detection, with the winning row highlighted
- Moves after a win and moves on a taken square are blocked
- Scoreboard (X wins, O wins, draws) that survives restarts within a session
- "Restart" / "Play again" button
- Works on phones (responsive board, large tap targets) and with a keyboard and screen reader (labelled squares, live status)

## Run it
```
npm install
npm run dev      # http://localhost:3000
npm test         # game rules (win, draw, blocked moves)
npm run build && npm start
```

## How it is organised
- `lib/game.js` holds the game rules as plain functions, with no React in it.
- `test/game.test.js` tests those rules with Node's built-in test runner.
- `app/page.js` is the React client component that renders the board and keeps state.

Built with help from Claude Code.
