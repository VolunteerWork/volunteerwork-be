import AuthService from "../Services/AuthService.js";

class AuthController {
    async login(req, res, next) {
        try {
            const account = await AuthService.login(req.body);
            return res.status(200).json(account);
        } catch (error) {
            next(error);
        }
    }

    async registryStudent(req, res, next) {
        try {
            const student = await AuthService.registryStudent(req.body);
            return res.status(200).json(student);
        } catch (error) {
            next(error);
        }
    }

    async registryOrganization(req, res, next) {
        try {
            const organization = await AuthService.registryOrganization(req.body);
            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }

    async sendOTPcode(req, res, next) {
        try {
            await AuthService.sendOTPcode(req.query["email"]);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async activeAccount(req, res, next) {
        try {
            await AuthService.activeAccount(req.body);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req, res, next) {
        try {
            await AuthService.changePassword(req.body);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async logOut(req, res, next) {
        try {
            return res.clearCookie("Authorization").status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
