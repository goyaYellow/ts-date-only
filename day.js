"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
class Day {
    constructor(value) {
        if (value <= 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        if (value % 1 > 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        this.value = value;
    }
}
exports.Day = Day;
