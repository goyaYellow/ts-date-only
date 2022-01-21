"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateOnly = void 0;
const day_1 = require("./day");
const month_1 = require("./month");
const year_1 = require("./year");
class DateOnly {
    constructor(year, month, day) {
        // TODO ありえな年月日だったときにどうする？
        this.year = year;
        this.month = month;
        this.day = day;
    }
    static createByStr(source, separator) {
        if (separator === undefined)
            separator = "/";
        const splitted = source.split(separator);
        if (splitted.length !== 3)
            throw new Error(`元ネタの形式が不正です！ source=${source}`);
        const year = Number(splitted[0]);
        const month = Number(splitted[1]);
        const day = Number(splitted[2]);
        return new DateOnly(new year_1.Year(year), new month_1.Month(month), new day_1.Day(day));
    }
    static createByNum(year, month, day) {
        const date = new Date(year, month, day);
        return this.createByDate(date);
    }
    static createByDate(source) {
        return new DateOnly(new year_1.Year(source.getFullYear()), new month_1.Month(source.getMonth()), new day_1.Day(source.getDate()));
    }
    asDateWithFirstTime() {
        return new Date(this.year.value, this.month.value, this.day.value, 0, 0, 0, 0);
    }
    asDateWithLastTime() {
        return new Date(this.year.value, this.month.value, this.day.value, 23, 59, 59, 999999999999999999);
    }
    addYear(year) {
        if (typeof year === "number") {
            return new DateOnly(this.year.add(new year_1.Year(year)), this.month, this.day);
        }
        else {
            return new DateOnly(this.year.add(year), this.month, this.day);
        }
    }
    addMonth(month) {
        if (typeof month === "number") {
            return DateOnly.createByNum(this.year.value, this.month.value + month, this.day.value);
        }
        else {
            return DateOnly.createByNum(this.year.value, this.month.value + month.value, this.day.value);
        }
    }
}
exports.DateOnly = DateOnly;
