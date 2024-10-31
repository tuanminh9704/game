const fs = require("fs");

export const queryLog = (prisma : any) : void => {
    prisma.$on('query', (e : {query : string, params : string, duration : string}) => {
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