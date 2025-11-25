import { Injectable } from '@angular/core';
import { GameConfig, DEFAULT_GAME_CONFIG } from '@app/features/sum-memory/models';
import {
  PositionGameConfig,
  DEFAULT_POSITION_GAME_CONFIG,
} from '@app/features/position-number/models';

const SUM_MEMORY_CONFIG_KEY = 'sum_memory_config';
const POSITION_GAME_CONFIG_KEY = 'position_game_config';

/**
 * Configuration Service
 * Manages game configuration persistence via localStorage for all games
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  /**
   * Load Sum Memory configuration from localStorage or return default
   */
  loadConfig(): GameConfig {
    try {
      const stored = localStorage.getItem(SUM_MEMORY_CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored) as GameConfig;
      }
    } catch (error) {
      console.error('Error loading config from localStorage:', error);
    }
    return DEFAULT_GAME_CONFIG;
  }

  /**
   * Save Sum Memory configuration to localStorage
   */
  saveConfig(config: GameConfig): void {
    try {
      localStorage.setItem(SUM_MEMORY_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to localStorage:', error);
    }
  }

  /**
   * Reset Sum Memory configuration to default
   */
  resetConfig(): void {
    try {
      localStorage.removeItem(SUM_MEMORY_CONFIG_KEY);
    } catch (error) {
      console.error('Error resetting config:', error);
    }
  }

  /**
   * Load Position Game configuration from localStorage or return default
   */
  loadPositionConfig(): PositionGameConfig {
    try {
      const stored = localStorage.getItem(POSITION_GAME_CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored) as PositionGameConfig;
      }
    } catch (error) {
      console.error('Error loading position config from localStorage:', error);
    }
    return DEFAULT_POSITION_GAME_CONFIG;
  }

  /**
   * Save Position Game configuration to localStorage
   */
  savePositionConfig(config: PositionGameConfig): void {
    try {
      localStorage.setItem(POSITION_GAME_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving position config to localStorage:', error);
    }
  }

  /**
   * Reset Position Game configuration to default
   */
  resetPositionConfig(): void {
    try {
      localStorage.removeItem(POSITION_GAME_CONFIG_KEY);
    } catch (error) {
      console.error('Error resetting position config:', error);
    }
  }
}
