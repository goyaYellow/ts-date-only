"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Month = void 0;
class Month {
    constructor(value) {
        if (value <= 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        if (value % 1 > 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        this.value = value;
    }
}
exports.Month = Month;
