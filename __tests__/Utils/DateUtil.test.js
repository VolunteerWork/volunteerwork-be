import DateUtil from "../../Utils/DateUtil.js";

describe("DateUtil tests", () => {
  it("test printDate function", () => {
    const testDate = new Date(2025, 8, 11, 12, 30, 30, 30);
    const result = DateUtil.printDate(testDate);

    // Replace with your expected string output format
    expect(result).toBe("12:30,11/8/2025");
  });
});