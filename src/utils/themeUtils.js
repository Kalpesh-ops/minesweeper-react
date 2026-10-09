// Theme utility for dark/light mode management

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

const THEME_KEY = 'minesweeper-theme';

class ThemeManager {
  constructor() {
    this.currentTheme = THEMES.LIGHT;
    this.systemPreference = this.getSystemPreference();
    this.listeners = new Set();
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    }
  }

  getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  handleSystemThemeChange(e) {
    this.systemPreference = e.matches ? THEMES.DARK : THEMES.LIGHT;
    if (this.currentTheme === THEMES.SYSTEM) {
      this.applyTheme();
      this.notifyListeners();
    }
  }

  loadTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved && Object.values(THEMES).includes(saved)) {
        this.currentTheme = saved;
      }
    } catch (error) {
      console.warn('Error loading theme preference:', error);
    }
    
    this.applyTheme();
  }

  setTheme(theme) {
    if (!Object.values(THEMES).includes(theme)) {
      console.warn('Invalid theme:', theme);
      return;
    }

    this.currentTheme = theme;
    
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn('Error saving theme preference:', error);
    }
    
    this.applyTheme();
    this.notifyListeners();
  }

  getTheme() {
    return this.currentTheme;
  }

  getEffectiveTheme() {
    if (this.currentTheme === THEMES.SYSTEM) {
      return this.systemPreference;
    }
    return this.currentTheme;
  }

  applyTheme() {
    const effectiveTheme = this.getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Also add class for CSS selectors that prefer classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${effectiveTheme}`);
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentTheme, this.getEffectiveTheme());
      } catch (error) {
        console.warn('Error in theme listener:', error);
      }
    });
  }
}

// Create singleton instance
const themeManager = new ThemeManager();

// Initialize theme on load
themeManager.loadTheme();

export default themeManager;
