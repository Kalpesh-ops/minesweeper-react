import { useState, useEffect } from 'react';
import soundManager from '../utils/soundUtils';
import themeManager, { THEMES } from '../utils/themeUtils';
import { KEYBOARD_HELP } from '../utils/keyboardUtils';
import './Settings.css';

const Settings = ({ isOpen, onClose }) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
  const [theme, setTheme] = useState(themeManager.getTheme());

  useEffect(() => {
    // Subscribe to theme changes to keep UI in sync
    const unsubscribe = themeManager.addListener((current) => setTheme(current));
    return unsubscribe;
  }, []);

  const handleSoundToggle = (enabled) => {
    setSoundEnabled(enabled);
    soundManager.setEnabled(enabled);
    
    // Play a test sound if enabling
    if (enabled) {
      setTimeout(() => soundManager.playClick(), 100);
    }
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setTheme(value);
    themeManager.setTheme(value);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="settings-body">
          {/* Appearance Settings */}
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Theme</span>
                <span className="setting-description">
                  Choose your preferred color theme
                </span>
              </div>
              <div className="setting-control">
                <select 
                  value={theme} 
                  onChange={handleThemeChange}
                  className="theme-select"
                >
                  <option value={THEMES.LIGHT}>☀️ Light</option>
                  <option value={THEMES.DARK}>🌙 Dark</option>
                  <option value={THEMES.SYSTEM}>💻 System</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="settings-section">
            <h3>Audio</h3>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">Sound Effects</span>
                <span className="setting-description">
                  Play sound effects for game actions
                </span>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => handleSoundToggle(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="settings-section">
            <h3>Keyboard Shortcuts</h3>
            <div className="keyboard-shortcuts">
              {KEYBOARD_HELP.map((shortcut, index) => (
                <div key={index} className="shortcut-item">
                  <kbd className="shortcut-key">{shortcut.key}</kbd>
                  <span className="shortcut-action">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game Info */}
          <div className="settings-section">
            <h3>About</h3>
            <div className="about-info">
              <p>
                <strong>Minesweeper React</strong>
              </p>
              <p>A modern implementation of the classic Minesweeper game.</p>
              <p>Built with React 19 and modern web technologies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
