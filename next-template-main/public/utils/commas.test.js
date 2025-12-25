// utils/commas.test.js

const { commas } = require("./common");

describe("commas()", () => {
  test("ใส่ comma ให้ตัวเลข", () => {
    expect(commas(1000)).toBe("1,000");
  });
});
