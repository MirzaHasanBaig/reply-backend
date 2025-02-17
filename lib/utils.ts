const { clsx, type ClassValue } = require ("clsx")
const { twMerge } = require ("tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
