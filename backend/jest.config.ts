export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./src/utils/testSetup.ts'], // File for global setup
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: './',
    testMatch: ['**/__tests__/**/*.test.(ts|js)'],
    coverageDirectory: './coverage',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  