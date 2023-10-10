"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../utils/tools");
class TeamAA {
    constructor(num) {
        this.num = 1;
        this.num = num;
    }
    calData(data) {
        const arr2d = (0, tools_1.csvToJson)(data);
        if (arr2d.length === 0) {
            throw '数据解析失败，请检查 csv 文件格式是否正确，参考 Demo。';
        }
        const team = {};
        const names = [];
        for (let i = 1; i <= this.num; i++) {
            const name = arr2d[0][i];
            names.push(name);
            if (!name)
                throw `请检查表头中 2～${this.num + 1} 列人名是否完整`;
            team[name] = {
                totalFee: 0,
                recordNum: 0,
                relatedNum: 0,
                transfer: {},
            };
        }
        let totalFee = 0;
        for (let i = 1; i < arr2d.length; i++) {
            const row = arr2d[i];
            const name = row[0];
            if (!team[name]) {
                throw `请检查第 ${i + 1} 行中付款人「${name}」是否是表头中 2～${this.num + 1} 其中之一。`;
            }
            team[name].recordNum++;
            let weight = 0;
            for (let j = 1; j <= this.num; j++) {
                if (row[j]) {
                    weight += Number(row[j]);
                }
            }
            const fee = Number(row[this.num + 1]) * 100;
            totalFee += fee;
            if (fee > 0)
                for (let j = 1; j <= this.num; j++) {
                    const myName = names[j - 1];
                    const myWeight = row[j] ? Number(row[j]) : 0;
                    const myfee = Math.floor(fee * (myWeight / weight));
                    if (myWeight !== 0) {
                        team[myName].relatedNum++;
                        team[myName].totalFee += myfee;
                        if (myName !== name) {
                            if (team[myName].transfer[name] === undefined) {
                                team[myName].transfer[name] = 0;
                            }
                            if (team[name].transfer[myName] === undefined) {
                                team[name].transfer[myName] = 0;
                            }
                            team[myName].transfer[name] += myfee;
                            team[name].transfer[myName] -= myfee;
                        }
                    }
                }
        }
        return {
            num: this.num,
            recordNum: arr2d.length - 1,
            totalFee,
            avgFee: Math.floor(totalFee / this.num),
            datas: team
        };
    }
}
exports.default = TeamAA;
//# sourceMappingURL=TeamAA.js.map