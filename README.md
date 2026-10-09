# 💣 Minesweeper React

A modern, fully-featured Minesweeper game built with React 19 and Vite. Experience the classic puzzle game with a clean, responsive interface and smooth gameplay.

## ✨ Features

- 🎯 **Classic Minesweeper Gameplay** - Left-click to reveal, right-click to flag
- 🎚️ **Multiple Difficulty Levels** - Beginner, Intermediate, and Expert modes
- ⏱️ **Live Timer** - Track your solving time
- 🚩 **Smart Mine Counter** - Shows remaining mines to find
- 🎉 **Win/Loss Detection** - Celebrate victories and learn from defeats
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast & Modern** - Built with React 19 and Vite for optimal performance
- 🔧 **Clean Architecture** - Modular components and custom hooks

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minesweeper-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game!

## 🎮 How to Play

### Basic Rules
- **Left Click**: Reveal a cell
- **Right Click**: Flag/unflag a cell as a potential mine
- **Numbers**: Show how many mines are adjacent to that cell
- **Goal**: Reveal all non-mine cells to win

### Game Mechanics
- First click is always safe (no mine will be placed there or adjacent)
- Clicking an empty cell (0 adjacent mines) reveals all connected empty cells
- Timer starts on your first click
- Flag mines to keep track of dangerous cells

### Difficulty Levels
| Difficulty | Board Size | Mines | Description |
|------------|------------|-------|--------------|
| Beginner | 9×9 | 10 | Perfect for learning the game |
| Intermediate | 16×16 | 40 | Good challenge for experienced players |
| Expert | 16×30 | 99 | Ultimate test of skill and patience |

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reloading
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Auto-fix ESLint issues
npm run lint -- --fix
```

### Project Structure

```
src/
├── components/           # React components
│   ├── Cell.jsx         # Individual minesweeper cell
│   ├── Cell.css         # Cell styling
│   ├── GameBoard.jsx    # Game board grid
│   ├── GameBoard.css    # Board styling
│   ├── GameControls.jsx # Controls and status display
│   └── GameControls.css # Controls styling
├── hooks/               # Custom React hooks
│   └── useMinesweeper.js # Core game state management
├── utils/               # Utility functions
│   └── minesweeperUtils.js # Game logic and algorithms
├── assets/              # Static assets
│   └── react.svg        # React logo
├── App.jsx             # Main application component
├── App.css             # Global app styles
├── main.jsx            # Application entry point
└── index.css           # Global CSS styles
```

### Architecture Highlights

- **Custom Hook Pattern**: Game logic encapsulated in `useMinesweeper` hook
- **Pure Functions**: All game algorithms are side-effect free and testable
- **Component Separation**: Clean separation between UI and game logic
- **Modern React**: Uses React 19 features with proper hooks and state management

## 🎨 Customization

### Adding New Difficulty Levels

1. Update the `DIFFICULTIES` object in `src/hooks/useMinesweeper.js`:
   ```javascript
   const DIFFICULTIES = {
     beginner: { rows: 9, cols: 9, mines: 10 },
     intermediate: { rows: 16, cols: 16, mines: 40 },
     expert: { rows: 16, cols: 30, mines: 99 },
     custom: { rows: 20, cols: 20, mines: 60 }, // Your new difficulty
   };
   ```

2. Update the difficulties object in `src/components/GameControls.jsx` to include the label.

### Styling

The game uses vanilla CSS with CSS custom properties (variables) for theming. Key files:
- `src/index.css` - Global styles and CSS variables
- `src/App.css` - Main application layout
- `src/components/*.css` - Component-specific styles

## 🧪 Testing

While tests aren't included in this version, the architecture makes testing straightforward:

- **Utility Functions**: Pure functions in `minesweeperUtils.js` are easily unit tested
- **Custom Hook**: `useMinesweeper` can be tested with React Testing Library
- **Components**: UI components can be tested for rendering and interactions

### Recommended Testing Setup
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: `npm run build` and deploy `dist/` folder
- **Netlify**: Connect your repository and set build command to `npm run build`
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Firebase Hosting**: `firebase deploy` after building

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the linter (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex game logic
- Ensure responsive design works on mobile

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🛡️ Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📧 Support

If you encounter any issues or have questions:

1. Check the existing GitHub issues
2. Create a new issue with a detailed description
3. Include browser/OS information if reporting bugs

---

**Enjoy playing Minesweeper!** 🎉

*Built with ❤️ using React and Vite*
