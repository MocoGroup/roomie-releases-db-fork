/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        stringifyContentPathRegex: String.raw`\.(html|svg)$`,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.module.ts',
    '!src/main.ts',
    '!src/app/app.config.ts',
    '!src/app/app.routes.ts',
    '!src/enviroments/**',
  ],
  coverageThreshold: {
    './src/app/services/habit.service.ts': { statements: 70, branches: 80, functions: 70, lines: 70 },
    './src/app/services/recommendation.service.ts': { statements: 70, branches: 80, functions: 70, lines: 70 },
    './src/app/components/filter-panel/filter-panel.component.ts': { statements: 70, branches: 80, functions: 70, lines: 70 },
    './src/app/components/student-card/student-card.component.ts': { statements: 70, branches: 80, functions: 70, lines: 70 },
  },
};
