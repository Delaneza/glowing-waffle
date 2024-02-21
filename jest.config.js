/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register({
  transpileOnly: true,
});
require('tsconfig-paths').register();

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  testRegex: '((\\.|/)(spec))\\.(js?|ts?)$',
  setupFilesAfterEnv: ["./tests/unit-setup.ts"],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/tmp/',
    '<rootDir>/.docker/',
  ],
};