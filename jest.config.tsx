import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Sync object

const esModules = ['lodash-es', 'axios'].join('|')

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  presets: [
    [
      '@babel/preset-env',
      targets: {
        node: 'current'
      }
    ]
};
export default config;