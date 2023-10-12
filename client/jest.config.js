/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './testing/mswServerSetup.ts'
  ],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      // Required due to Next.JS compiler forcing compilerOptions.jsx to "preserve", which is not compatible with Jest.
      {tsconfig: './tsconfig.test.json'},
    ]
  }
};
