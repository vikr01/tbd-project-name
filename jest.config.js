module.exports = {
  rootDir: __dirname,

  collectCoverageFrom: [
    '<rootDir>/packages/*/**/*.js',
    '<rootDir>/packages/*/**/*.jsx',
    '!<rootDir>/packages/scripts/**',
    '!<rootDir>/packages/dist/**',
    '!<rootDir>/packages/test/**',
    '!<rootDir>/packages/.*',
    '!<rootDir>/.*',
  ],

  collectCoverage: true,

  coverageDirectory: './coverage/',

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  testPathIgnorePatterns: ['/node_modules/'],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
