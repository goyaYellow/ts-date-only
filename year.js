"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Year = void 0;
class Year {
    constructor(value) {
        if (value <= 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        if (value % 1 > 0)
            throw new Error(`valueは1以上の自然数でないといけません。value=${value}`);
        this.value = value;
    }
    add(other) {
        return new Year(this.value + other.value);
    }
}
exports.Year = Year;
