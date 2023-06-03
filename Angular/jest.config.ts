export default {
  clearMocks: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: ["**/src/**/*.(test|spec).ts"]
};
