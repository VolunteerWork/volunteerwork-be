import RequestError from "../Errors/RequestError.js";
import Account from "../Models/Account.js";
import bcrypt from "bcryptjs";
import { ORGANIZATION, STUDENT } from "../Utils/Constraints.js";
import Organization from "../Models/Organization.js";
import Student from "../Models/Student.js";
import EmailService from "./EmailService.js";
import TokenHandler from "../Utils/TokenHandler.js";

class AuthService {
    async login({ email, password }) {
        if (!email || !password) throw new RequestError("Email and password are required");
        const account = await Account.findByEmail(email);
        if (!account) throw new RequestError("Email " + email + " does not exist");
        if (!bcrypt.compareSync(password, account.password)) {
            throw new RequestError("Password is incorrect");
        }
        account.password = "";
        return { account, jwtToken: TokenHandler.generateToken(account) };
    }

    async #addNewAccount(newAccount, role) {
        if (!newAccount) throw new RequestError("Account is not null");
        if (!newAccount.password) throw new RequestError("Password is required");
        const existedAccount = await Account.findByEmail(newAccount.email);
        if (existedAccount) {
            throw new RequestError("This email has been used. Please choose another email");
        }
        newAccount.role = role;
        newAccount.isActive = false;
        this.#sendOTPcode(newAccount);
        const account = await Account.create(newAccount);
        return account.id;
    }

    async registryStudent(newStudent) {
        if (!newStudent.name) throw new RequestError("Name is required");
        newStudent.totalPoints = 0;
        const accountId = await this.#addNewAccount(newStudent.account, STUDENT);
        newStudent.account = accountId;
        const savedStudent = await Student.create(newStudent);
        savedStudent.account.password = "";
        return savedStudent;
    }

    async registryOrganization(newOrg) {
        if (!newOrg.name) throw new RequestError("Name is required");
        newOrg.isVerified = false;
        const accountId = await this.#addNewAccount(newOrg.account, ORGANIZATION);
        newOrg.account = accountId;
        const savedOrg = await Organization.create(newOrg);
        savedOrg.account.password = "";
        return savedOrg;
    }

    async sendOTPcode(email) {
        const account = await Account.findByEmail(email);
        if (!account) throw new RequestError("Email " + email + " does not exist");
        this.#sendOTPcode(account);
        await account.save();
    }

    #sendOTPcode(account) {
        let otpCode = "";
        for (let i = 0; i <= 5; i++) otpCode += Math.floor(Math.random() * 10);
        account.otpCode = otpCode;
        const now = new Date();
        account.otpTime = new Date(now.getTime() + 10 * 60000);
        EmailService.sendOTPcode(account.email, otpCode);
    }

    async activeAccount({ email, otpCode }) {
        const account = await Account.findByEmail(email);
        if (!account) throw new RequestError("Email " + email + " does not exist");
        const now = new Date();
        if (!account.otpTime || account.otpTime < now) {
            throw new RequestError("The OTP code has been expired");
        }
        if (account.otpCode !== otpCode) {
            throw new RequestError("The entered OTP code is incorrect");
        }
        account.otpTime = null;
        account.otpCode = null;
        account.isActive = true;
        await account.save();
    }

    async changePassword({ email, newPassword, otpCode }) {
        const account = await Account.findByEmail(email);
        if (!account) throw new RequestError("Email " + email + " does not exist");
        const now = new Date();
        if (!account.otpTime || account.otpTime < now) {
            throw new RequestError("The OTP code has been expired");
        }
        if (account.otpCode !== otpCode) {
            throw new RequestError("The entered OTP code is incorrect");
        }
        account.otpTime = null;
        account.otpCode = null;
        account.isActive = true;
        account.password = newPassword;
        await account.save();
    }
}

export default new AuthService();