const { pgbackend } = require('./base-model');
const pgClient = require('../config/pg-client')

const getUseCasesDetails = async (req, res) => {
    qrystr = `select * from use_case_master where active_status = true order by priority_label`

    return pgbackend(qrystr)
}

module.exports = { getUseCasesDetails }