module.exports = {
  // rootDir: __dirname,

  collectCoverageFrom: [
    '**/*.{js,jsx}',
    //   '!**/packages/scripts/**',
    //   '!**/packages/dist/**',
    //   // '!<rootDir>/packages/test/**',
    //   // '!<rootDir>/packages/.*',
    //   // '!<rootDir>/.*',
  ],

  coveragePathIgnorePatterns: [
    '**/node_modules/',
    '**/dist',
    'packages/.*',
    'packages/scripts/**',
  ],

  collectCoverage: true,

  coverageDirectory: './coverage/',
};
