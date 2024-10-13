/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['./jest.polyfills.js'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }]],

  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
  },
};
