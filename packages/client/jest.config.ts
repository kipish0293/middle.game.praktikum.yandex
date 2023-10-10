import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'babel',
  collectCoverage: false,
  maxWorkers: '50%',
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/jestMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jestMock.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: [],
};

export default config;
