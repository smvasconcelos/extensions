"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManhwaController = void 0;
const manhwa_service_1 = require("../service/manhwa.service");
class ManhwaController {
    constructor() {
        this.service = new manhwa_service_1.ManhwaService();
    }
    async checkAndCreateUser(req, res) {
        try {
            const email = req.query.email;
            if (!email) {
                const response = {
                    message: 'Email is required',
                    status: 400,
                };
                res.status(400).json(response);
                return;
            }
            const userExists = await this.service.checkAndCreateUser(email);
            if (userExists) {
                const response = {
                    message: 'User already exists',
                    status: 200,
                };
                res.status(200).json(response);
            }
            else {
                const response = {
                    message: 'Manhwa added successfully',
                    status: 201,
                };
                res.status(201).json(response);
            }
        }
        catch (err) {
            const response = {
                message: 'User already exists',
                status: 200,
                error: err,
            };
            res.status(200).json(response);
        }
    }
    async addManhwa(req, res) {
        try {
            const { url, chapter, name, email, img, card } = req.body;
            if (!email) {
                const response = {
                    message: 'Email is required',
                    status: 400,
                };
                res.status(400).json(response);
                return;
            }
            await this.service.addManhwa(url || '', chapter || '', name || '', email, img || '', card || false);
            const response = {
                message: 'Manhwa added successfully',
                status: 201,
            };
            res.status(201).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error adding manhwa',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
    async removeManhwa(req, res) {
        try {
            const { data, email } = req.body;
            if (!email || !data) {
                const response = {
                    message: 'Email and data are required',
                    status: 400,
                };
                res.status(400).json(response);
                return;
            }
            await this.service.removeManhwa(email, data);
            const response = {
                message: 'Manhwa removed successfully',
                status: 201,
            };
            res.status(201).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error removing manhwa',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
    async getManhwa(req, res) {
        try {
            const email = req.query.email;
            if (!email) {
                const response = {
                    message: 'Email is required',
                    status: 400,
                };
                res.status(400).json(response);
                return;
            }
            const data = await this.service.getManhwa(email);
            const response = {
                message: 'Manhwa listed successfully',
                status: 200,
                data: data,
            };
            res.status(200).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error listing manhwa',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
}
exports.ManhwaController = ManhwaController;
