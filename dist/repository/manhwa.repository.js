"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManhwaRepository = void 0;
const database_1 = require("../config/database");
class ManhwaRepository {
    static encodeKey(email) {
        return Buffer.from(email).toString('base64');
    }
    // Buscar todos os manhwas de um usuário
    async getManhwaByUser(email) {
        const key = ManhwaRepository.encodeKey(email);
        const snapshot = await database_1.manhwaRef.where('userId', '==', key).get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    // Buscar manhwa específico por ID
    async getManhwaById(id) {
        const doc = await database_1.manhwaRef.doc(id).get();
        if (!doc.exists)
            return null;
        return {
            id: doc.id,
            ...doc.data(),
        };
    }
    // Verificar se manhwa já existe (para evitar duplicatas)
    async checkManhwaExists(userId, name, card) {
        const snapshot = await database_1.manhwaRef
            .where('userId', '==', userId)
            .where('name', '==', name)
            .where('card', '==', card)
            .limit(1)
            .get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        };
    }
    // Criar novo manhwa
    async createManhwa(manhwa) {
        const { generateManhwaId } = await Promise.resolve().then(() => __importStar(require('../utils/id-generator')));
        const id = generateManhwaId(manhwa.userId, manhwa.name, manhwa.card);
        await database_1.manhwaRef.doc(id).set(manhwa);
        return id;
    }
    // Atualizar manhwa existente
    async updateManhwa(id, updates) {
        await database_1.manhwaRef.doc(id).update(updates);
    }
    // Deletar manhwa
    async deleteManhwa(id) {
        await database_1.manhwaRef.doc(id).delete();
    }
    // Verificar se usuário existe (tem algum manhwa)
    async checkUserExists(email) {
        const key = ManhwaRepository.encodeKey(email);
        const snapshot = await database_1.manhwaRef.where('userId', '==', key).limit(1).get();
        return !snapshot.empty;
    }
}
exports.ManhwaRepository = ManhwaRepository;
