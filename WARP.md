# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A fully functional Minesweeper game built with React 19 and Vite. The game implements classic Minesweeper mechanics with multiple difficulty levels, timer functionality, and modern React patterns including custom hooks.

## Common Development Commands

### Running the Application
```bash
# Start development server with hot reloading
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint on entire project
npm run lint

# Auto-fix ESLint issues
npm run lint -- --fix
```

### Package Management
```bash
# Install dependencies
npm install

# Add a new dependency
npm install <package-name>

# Add a dev dependency
npm install -D <package-name>
```

## Architecture Overview

### Tech Stack
- **React 19** - Latest React with modern features
- **Vite 7** - Lightning-fast build tool and dev server
- **ESLint** - Code linting with React-specific rules
- **CSS Modules/Vanilla CSS** - Component-scoped styling

### Project Structure
```
src/
├── components/           # React components
│   ├── Cell.jsx         # Individual minesweeper cell
│   ├── GameBoard.jsx    # Grid layout and cell rendering
│   └── GameControls.jsx # Game controls and status display
├── hooks/               # Custom React hooks
│   └── useMinesweeper.js # Core game state management
├── utils/               # Pure utility functions
│   └── minesweeperUtils.js # Game logic algorithms
├── assets/              # Static assets
├── App.jsx             # Main application component
└── main.jsx            # React app entry point
```

### Architecture Patterns

#### Custom Hook Pattern
The core game logic is encapsulated in `useMinesweeper.js` custom hook:
- Manages all game state (board, gameState, timer, difficulty)
- Provides game actions (handleCellClick, startNewGame, etc.)
- Handles complex state interactions and side effects
- Makes components pure and focused on rendering

#### Pure Utility Functions
Game algorithms are separated into `minesweeperUtils.js`:
- **Board Creation**: `createBoard()`, `placeMines()`
- **Game Actions**: `revealCell()`, `toggleFlag()`
- **Game Logic**: `checkGameWon()`, `countNeighborMines()`
- All functions are pure (no side effects) and testable

#### Component Separation
- **App.jsx**: High-level composition and data flow
- **GameControls**: Status display, difficulty selection, new game
- **GameBoard**: Grid layout and event delegation
- **Cell**: Individual cell rendering and interaction

### Key Implementation Details

#### First-Click Protection
Mines are placed only after the first click, ensuring the first cell is always safe and has a clear opening.

#### Flood Fill Algorithm
When an empty cell (0 neighbors) is clicked, the `revealCell()` function recursively reveals all connected empty cells using a flood-fill approach.

#### Timer Management
Timer starts on first cell click and stops when game ends (won/lost state).

#### Difficulty System
Three preset difficulties with configurable board sizes and mine counts:
- **Beginner**: 9×9, 10 mines
- **Intermediate**: 16×16, 40 mines  
- **Expert**: 16×30, 99 mines

## ESLint Configuration

The project uses modern ESLint with:
- `@eslint/js` - Core JavaScript rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-react-refresh` - React Fast Refresh compatibility
- Custom rule: `no-unused-vars` with pattern ignore for constants

## Development Notes

### State Management
- Uses React's built-in state with `useState` and `useReducer` patterns
- Complex state interactions handled in custom hook
- State updates are immutable (new objects/arrays created)

### Performance Considerations
- Game board re-renders optimized through proper key usage
- Event handlers wrapped in `useCallback` to prevent unnecessary re-renders
- Board state uses nested arrays for O(1) cell access

### Game Logic Edge Cases
- First click safety (no mines placed adjacent to first click)
- Right-click disabled on revealed cells
- Mine count display shows remaining mines (total - flags)
- Game over reveals all mines except correctly flagged ones

## File Naming Conventions
- Components: PascalCase (e.g., `GameBoard.jsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useMinesweeper.js`)
- Utilities: camelCase (e.g., `minesweeperUtils.js`)
- Styles: Same name as component (e.g., `GameBoard.css`)

## When Making Changes

### Adding New Features
- Game logic changes go in `minesweeperUtils.js`
- State management changes go in `useMinesweeper.js` hook
- UI changes go in respective component files
- New components should follow the existing patterns

### Testing Considerations
- All utility functions are pure and easily testable
- Custom hook can be tested with React Testing Library
- Consider adding test cases for edge cases like first-click safety

### Performance Optimization
- Use React DevTools Profiler to identify re-render issues
- Consider `useMemo` for expensive calculations
- Board size affects performance - larger boards may need optimization
