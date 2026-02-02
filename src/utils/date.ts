/**
 * Calculate age from a birth date string
 * @param birthDate - ISO date string (YYYY-MM-DD)
 * @returns Current age in years
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // If birthday hasn't occurred this year yet, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Format a date string for display
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return new Date(dateString).toLocaleDateString('en-US', options);
}
