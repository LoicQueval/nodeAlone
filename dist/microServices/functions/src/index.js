"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
exports.createUser = functions.firestore
    .document('create-hostels/{hostelId}')
    .onCreate((snap, context) => {
    const newHotel = snap.data();
    newHotel.uId = snap.id;
    return snap.ref.set(newHotel);
});
//# sourceMappingURL=index.js.map