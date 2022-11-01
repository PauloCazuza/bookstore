import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
// Sync object

const esModules = ['lodash-es', 'axios'].join('|')

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