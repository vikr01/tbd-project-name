/* eslint
import/no-commonjs: 0
*/

module.exports = {
  rootDir: __dirname,

  testURL: 'http://localhost/',

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: ['js', 'jsx', 'json'],
};
