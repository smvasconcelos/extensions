"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const history_service_1 = require("../service/history.service");
class HistoryController {
    constructor() {
        this.service = new history_service_1.HistoryService();
    }
    async addHistory(req, res) {
        try {
            const title = req.query.url;
            const email = req.query.email;
            if (!email || !title) {
                const response = {
                    message: 'Email and url are required',
                    status: 400,
                };
                res.status(400).json(response);
                return;
            }
            await this.service.addHistory(email, title);
            const response = {
                message: 'History added successfully',
                status: 201,
            };
            res.status(201).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error adding history',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
    async removeHistory(req, res) {
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
            await this.service.removeHistory(email, data);
            const response = {
                message: 'History removed successfully',
                status: 201,
            };
            res.status(201).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error removing history',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
    async getHistory(req, res) {
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
            const data = await this.service.getHistory(email);
            const response = {
                message: 'History listed successfully',
                status: 200,
                data: data,
            };
            res.status(200).json(response);
        }
        catch (err) {
            const response = {
                message: 'Error listing history',
                status: 500,
                error: err,
            };
            res.status(500).json(response);
        }
    }
}
exports.HistoryController = HistoryController;
