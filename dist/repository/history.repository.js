"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const database_1 = require("../config/database");
class HistoryRepository {
    static encodeKey(email) {
        return Buffer.from(email).toString('base64');
    }
    // Buscar todo histórico de um usuário
    async getHistoryByUser(email) {
        const key = HistoryRepository.encodeKey(email);
        const doc = await database_1.historyRef.doc(key).get();
        if (!doc.exists) {
            return [];
        }
        const data = doc.data();
        const histories = data.manhwa || [];
        // Ordenar por data (mais recente primeiro)
        return histories.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });
    }
    // Adicionar item ao histórico (usando arrayUnion)
    async addHistoryItem(email, item) {
        const key = HistoryRepository.encodeKey(email);
        const docRef = database_1.historyRef.doc(key);
        // Usar update com arrayUnion (cria o documento se não existir quando usado com merge)
        await docRef.update({
            manhwa: database_1.admin.firestore.FieldValue.arrayUnion(item),
        }).catch(async (error) => {
            // Se o documento não existir, criar com o primeiro item
            if (error.code === 'not-found' || error.code === 5) {
                await docRef.set({
                    manhwa: [item],
                });
            }
            else {
                throw error;
            }
        });
    }
    // Remover item do histórico (usando arrayRemove)
    async removeHistoryItem(email, item) {
        const key = HistoryRepository.encodeKey(email);
        const docRef = database_1.historyRef.doc(key);
        await docRef.update({
            manhwa: database_1.admin.firestore.FieldValue.arrayRemove(item),
        });
    }
    // Verificar se usuário tem histórico
    async checkUserHistoryExists(email) {
        const key = HistoryRepository.encodeKey(email);
        const doc = await database_1.historyRef.doc(key).get();
        if (!doc.exists) {
            return false;
        }
        const data = doc.data();
        return (data.manhwa?.length || 0) > 0;
    }
}
exports.HistoryRepository = HistoryRepository;
