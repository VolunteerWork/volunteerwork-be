import GiftService from "../Services/GiftService.js";

class GiftController {
    async addGift(req, res, next) {
        try {
            const gift = await GiftService.addGift(req.body.jsonData, req.file);
            return res.status(200).json(gift);
        } catch (error) {
            next(error);
        }
    }

    async getGifts(req, res, next) {
        try {
            const gifts = await GiftService.getGifts(req.body.jsonData, req.file);
            return res.status(200).json(gifts);
        } catch (error) {
            next(error);
        }
    }

    async awardGift(req, res, next) {
        try {
            const gift = await GiftService.awardGift(req.student, req.body);
            return res.status(200).json(gift);
        } catch (error) {
            next(error);
        }
    }
}

export default new GiftController();