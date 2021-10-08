"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var AccommodationSchema = new Schema({
    name: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    description: { type: String, required: true },
    maxGuestsNo: { type: Number, required: true },
    city: { type: String, required: true }
});
exports.default = model('Accommodation', AccommodationSchema);
