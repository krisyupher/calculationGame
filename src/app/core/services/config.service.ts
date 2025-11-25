import { Injectable } from '@angular/core';
import { GameConfig, DEFAULT_GAME_CONFIG } from '@app/features/game/models';

const CONFIG_STORAGE_KEY = 'game_config';

/**
 * Configuration Service
 * Manages game configuration persistence via localStorage
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  /**
   * Load configuration from localStorage or return default
   */
  loadConfig(): GameConfig {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as GameConfig;
      }
    } catch (error) {
      console.error('Error loading config from localStorage:', error);
    }
    return DEFAULT_GAME_CONFIG;
  }

  /**
   * Save configuration to localStorage
   */
  saveConfig(config: GameConfig): void {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to localStorage:', error);
    }
  }

  /**
   * Reset configuration to default
   */
  resetConfig(): void {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting config:', error);
    }
  }
}
