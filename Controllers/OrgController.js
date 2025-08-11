import OrgService from "../Services/OrgService.js";

class OrgController {
    async getLoginedInfo(req, res, next) {
        try {
            return res.status(200).json(req.org);
        } catch (error) {
            next(error);
        }
    }

    async getOrganizationById(req, res, next) {
        try {
            const organization = await OrgService.getOrganizationById(req.params.id);
            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }

    async searchByName(req, res, next) {
        try {
            const organizations = await OrgService.searchByName(req.query["searchString"]);
            return res.status(200).json(organizations);
        } catch (error) {
            next(error);
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            const avatarUrl = await OrgService.uploadAvatar(req.org, req.file);
            return res.status(200).json(avatarUrl);
        } catch (error) {
            next(error);
        }
    }

    async verifyOrganization(req, res, next) {
        try {
            await OrgService.verifyOrganization(req.params.id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async updateOrganization(req, res, next) {
        try {
            const org = await OrgService.updateOrganization(req.org, req.body);
            return res.status(200).json(org);
        } catch (error) {
            next(error);
        }
    }

    async getOrganizations(req, res, next) {
        try {
            const organizations = await OrgService.getOrganizations(req.query);
            return res.status(200).json(organizations);
        } catch (error) {
            next(error);
        }
    }
}

export default new OrgController();