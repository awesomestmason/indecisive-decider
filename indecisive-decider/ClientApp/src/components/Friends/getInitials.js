/**
 * getInitials.js
 * - Main Author: Qiance Yu
 * 
 * Description: format the username
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
 */

const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');

export default getInitials;
