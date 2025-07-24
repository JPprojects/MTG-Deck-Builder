/**
 * Formats a theme name into a URL-friendly slug
 * Converts special characters to their English word equivalents
 * @param {string} themeName - The theme name to format
 * @returns {string} - Formatted theme name
 */
export function formatThemeName(themeName) {
  if (!themeName) return '';
  console.log('themeName', themeName)
  
  // First handle special patterns like +1/+1 and -1/-1 counters
  const withSpecialPatterns = themeName
    .replace(/\+1\/\+1/g, 'plus-1-plus-1')  // Convert +1/+1 to plus-1-plus-1
    .replace(/-1\/-1/g, 'minus-1-minus-1')  // Convert -1/-1 to minus-1-slash-minus-1
  
  // Then handle other special characters
  const withWords = withSpecialPatterns
    .replace(/&/g, '-and-')
    .replace(/[^\w\s-]/g, '-'); // Replace any remaining special chars with hyphens
  
  // Then format as a clean slug
  return withWords
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-')   // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Reverts a formatted theme name back to its display version
 * @param {string} formattedName - The formatted theme name
 * @returns {string} - Display-friendly theme name
 */
export function unformatThemeName(formattedName) {
  if (!formattedName) return '';
  
  // First handle special patterns like -1/-1
  const withSpecialPatterns = formattedName
    .replace(/plus-1-plus-1/g, '+1/+1')  // Convert plus-1-plus-1 back to +1/+1
    .replace(/minus-1-minus-1/g, '-1/-1')  // Convert minus-1-slash-minus-1 back to -1/-1
  
  // Handle remaining hyphens and capitalization
  return withSpecialPatterns.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}
