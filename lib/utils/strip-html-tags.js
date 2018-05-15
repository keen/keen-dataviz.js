/**
 * Strip html tags from string
 *
 * @param  {string} string The string to strip
 * @return {string}
 * @public
 */

export function stripHtmlTags(inputString) {
  return inputString.replace(/(<([^>]+)>)/ig, '');
}
