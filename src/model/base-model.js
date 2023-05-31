const pgClient = require('../config/pg-client')

const pgbackend = async (query) => {
    return pgClient.query(query)
}
const executeTransaction = async (callback) => {
    //await pgClient.connect();
    try {
        await pgClient.query('BEGIN');
        try {
            await callback(pgClient);
            await pgClient.query('COMMIT');
        } catch (error) {
            await pgClient.query('ROLLBACK');
            console.error(error.stack)
            throw (error)
        }
    } finally {
       // await pgClient.end();
    }
};
module.exports = { pgbackend, executeTransaction }