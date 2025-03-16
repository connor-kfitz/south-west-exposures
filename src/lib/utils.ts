import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  const randomValues = crypto.getRandomValues(new Uint8Array(16));

  randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80;

  const uuid = [
    ...randomValues.slice(0, 4),
    ...randomValues.slice(4, 6),
    ...randomValues.slice(6, 8),
    ...randomValues.slice(8, 10),
    ...randomValues.slice(10)
  ]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('');

  return uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);
}
