"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/database");
const app_1 = __importDefault(require("./config/app"));
const manhwa_routes_1 = __importDefault(require("./routes/manhwa.routes"));
const history_routes_1 = __importDefault(require("./routes/history.routes"));
app_1.default.use('/', manhwa_routes_1.default);
app_1.default.use('/', history_routes_1.default);
const PORT = process.env.PORT || 3002;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
