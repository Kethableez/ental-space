export function parseColor(colorValue: string): string {
  return colorValue.startsWith('#') ? colorValue : `var(--${colorValue})`;
}
