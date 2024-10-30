"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLog = void 0;
const fs = require("fs");
const queryLog = (prisma) => {
    prisma.$on('query', (e) => {
        try {
            const log = {
                "query": e.query,
                "params": e.params,
                "duration": e.duration,
            };
            fs.appendFileSync('prisma-queries-log.txt', JSON.stringify(log), 'utf8');
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.queryLog = queryLog;
