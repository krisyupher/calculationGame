/**
 * Screen Type Enumeration
 * Defines all possible screens in the game application
 */

export enum ScreenType {
  /** Initial screen with instructions and start button */
  START = 'start',

  /** Settings configuration screen */
  SETTINGS = 'settings',

  /** Countdown screen with traffic lights */
  COUNTDOWN = 'countdown',

  /** Number display screen during gameplay */
  PLAYING = 'playing',

  /** User input screen for answer submission */
  INPUT = 'input',

  /** Result screen showing game outcome */
  RESULT = 'result',
}

/**
 * Type guard to check if a value is a valid ScreenType
 * @param value Value to check
 * @returns true if value is a valid ScreenType
 */
export function isValidScreenType(value: unknown): value is ScreenType {
  return Object.values(ScreenType).includes(value as ScreenType);
}

/**
 * Get human-readable screen name
 * @param screen Screen type
 * @returns Human-readable screen name
 */
export function getScreenName(screen: ScreenType): string {
  const names: Record<ScreenType, string> = {
    [ScreenType.START]: 'Start',
    [ScreenType.SETTINGS]: 'Settings',
    [ScreenType.COUNTDOWN]: 'Countdown',
    [ScreenType.PLAYING]: 'Playing',
    [ScreenType.INPUT]: 'Input',
    [ScreenType.RESULT]: 'Result',
  };
  return names[screen];
}
