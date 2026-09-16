module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/test/svgMock.js",
  },
};