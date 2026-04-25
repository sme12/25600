import base from '../prettier.config.js';

/** @type {import("prettier").Config} */
export default {
  ...base,
  plugins: [...base.plugins, 'prettier-plugin-tailwindcss'],
};
