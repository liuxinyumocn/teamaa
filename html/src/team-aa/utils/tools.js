"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToJson = void 0;
function csvToJson(csv) {
    const lines = csv.split("\n");
    if (lines.length === 0) {
        return [];
    }
    const json = [];
    for (let i = 0; i < lines.length; i++) {
        const regex = /(?:,|^)(?:"([^"]*)"|([^",]*))/g;
        const line = [];
        for (let j = 0; j < 999; j++) {
            let matches = regex.exec(lines[i]);
            if (!matches) {
                break;
            }
            const value = matches[1] ? matches[1] : matches[2];
            line.push(value);
        }
        line.pop();
        for (let item of line) {
            if (item != '') {
                json.push(line);
                break;
            }
        }
    }
    return json;
}
exports.csvToJson = csvToJson;
//# sourceMappingURL=tools.js.map