/**
 * Countdown Step Model
 * Represents a single step in the countdown sequence
 */

export interface CountdownStep {
  /** Light color: 'red' | 'yellow' | 'green' */
  light: 'red' | 'yellow' | 'green';

  /** Text to display during this step */
  text: string;

  /** Duration in milliseconds to show this step */
  duration: number;
}

/**
 * Standard countdown sequence
 * Used before each game starts
 */
export const COUNTDOWN_SEQUENCE: CountdownStep[] = [
  {
    light: 'red',
    text: 'Preparing...',
    duration: 1000,
  },
  {
    light: 'yellow',
    text: 'Ready...',
    duration: 1000,
  },
  {
    light: 'green',
    text: 'GO!',
    duration: 500,
  },
];

/**
 * Get color hex value for light
 * @param light Light color
 * @returns Hex color code
 */
export function getLightColor(light: 'red' | 'yellow' | 'green'): string {
  const colors: Record<'red' | 'yellow' | 'green', string> = {
    red: '#ef4444',
    yellow: '#eab308',
    green: '#22c55e',
  };
  return colors[light];
}
