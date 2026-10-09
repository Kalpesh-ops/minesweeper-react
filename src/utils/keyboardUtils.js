// Keyboard shortcuts utility

export const KEYBOARD_SHORTCUTS = {
  NEW_GAME: ['KeyR', 'F2'],
  TOGGLE_FLAG: ['Space'],
  ESCAPE: ['Escape'],
};

export function setupKeyboardListeners(callbacks) {
  const handleKeyDown = (event) => {
    // Prevent default behavior for our shortcuts
    if (KEYBOARD_SHORTCUTS.NEW_GAME.includes(event.code)) {
      event.preventDefault();
      callbacks.onNewGame?.();
    } else if (KEYBOARD_SHORTCUTS.TOGGLE_FLAG.includes(event.code)) {
      event.preventDefault();
      callbacks.onToggleFlag?.();
    } else if (KEYBOARD_SHORTCUTS.ESCAPE.includes(event.code)) {
      event.preventDefault();
      callbacks.onEscape?.();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

export const KEYBOARD_HELP = [
  { key: 'R or F2', action: 'Start new game' },
  { key: 'Spacebar', action: 'Toggle flag (when cell focused)' },
  { key: 'Escape', action: 'Close modals' },
];
