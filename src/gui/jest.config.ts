import type {Config} from 'jest';

const configFile = './babel.jest.js';

const config: Config = {
  verbose: true,
  preset: 'jest-expo',
  transform: {
    '^.+\\.jsx?$': ['babel-jest', {caller: {preserveEnvVars: true}}],
    '^.+\\.tsx?$': ['babel-jest', {caller: {preserveEnvVars: true}}],
  },
  setupFiles: ['./jest.setup.ts'],
};

export default config;
