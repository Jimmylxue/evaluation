// react
const defineJestConfig =
  require("@tarojs/test-utils-react/dist/jest.js").default;

module.exports = defineJestConfig({
  // testEnvironment: "jsdom", // 测试使用的环境
  testMatch: ["<rootDir>/src/__test__/**/*.spec.{js,ts}"], // 测试文件匹配
});
