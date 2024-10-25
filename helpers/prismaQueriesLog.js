const fs = require("fs");

module.exports.queryLog = (prisma) => {
    prisma.$on('query', (e) => {
        try {
            const log = {
                "query": e.query,
                "params": e.params,
                "duration": e.duration,
            }
            fs.appendFileSync('prisma-queries-log.txt', JSON.stringify(log), 'utf8')
        } catch (error) {
            console.log(error);
        }
    })
}