// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest", // Use @swc/jest to transform JS, JSX, TS, and TSX files
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports for testing
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"], // Ensure Jest recognizes these extensions
};
