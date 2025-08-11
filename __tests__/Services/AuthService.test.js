import { jest } from "@jest/globals";

jest.unstable_mockModule("../../Models/Account.js", () => ({
  default: {
    findByEmail: jest.fn()
  }
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: { compareSync: jest.fn() }
}));

jest.unstable_mockModule("../../Utils/TokenHandler.js", () => ({
  default: { generateToken: jest.fn() }
}));

// Import after mocks are set up
const { default: AuthService } = await import("../../Services/AuthService.js");
const { default: Account } = await import("../../Models/Account.js");
const { default: bcrypt } = await import("bcryptjs");
const { default: TokenHandler } = await import("../../Utils/TokenHandler.js");

describe("login service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

 it("should throw if email or password is missing", async () => {
    await expect(AuthService.login({ email: "", password: "" }))
      .rejects.toThrow("Email and password are required");
  });

  it("should throw if account not found", async () => {
    Account.findByEmail.mockResolvedValue(null);

    await expect(AuthService.login({ email: "test@example.com", password: "pass" }))
      .rejects.toThrow("Email test@example.com does not exist");
  });

  it("should throw if password is incorrect", async () => {
    Account.findByEmail.mockResolvedValue({ password: "hashed" });
    bcrypt.compareSync.mockReturnValue(false);

    await expect(AuthService.login({ email: "test@example.com", password: "wrong" }))
      .rejects.toThrow("Password is incorrect");
  });

  it("should return account and jwtToken if login is successful", async () => {
    const fakeAccount = { password: "hashed" };
    const fakeToken = "jwt123";

    Account.findByEmail.mockResolvedValue({ ...fakeAccount });
    bcrypt.compareSync.mockReturnValue(true);
    TokenHandler.generateToken.mockReturnValue(fakeToken);

    const result = await AuthService.login({ email: "test@example.com", password: "correct" });

    expect(result.jwtToken).toBe(fakeToken);
    expect(result.account.password).toBe(""); // password should be cleared
    expect(TokenHandler.generateToken).toHaveBeenCalledWith(result.account);
  });
});