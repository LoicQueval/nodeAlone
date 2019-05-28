"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', function (req, res) {
    res.send('Hello World!')
        .status(200);
});
app.listen(4000, () => {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map