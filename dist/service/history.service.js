"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const history_repository_1 = require("../repository/history.repository");
class HistoryService {
    constructor() {
        this.repository = new history_repository_1.HistoryRepository();
    }
    // Adicionar item ao histórico
    async addHistory(email, title) {
        const historyItem = {
            title: title,
            date: new Date().toLocaleDateString('pt-BR').toString(),
        };
        await this.repository.addHistoryItem(email, historyItem);
    }
    // Remover item do histórico
    async removeHistory(email, historyItem) {
        await this.repository.removeHistoryItem(email, historyItem);
    }
    // Buscar todo histórico de um usuário
    async getHistory(email) {
        const items = await this.repository.getHistoryByUser(email);
        return {
            manhwa: items,
        };
    }
}
exports.HistoryService = HistoryService;
