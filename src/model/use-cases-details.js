const { pgbackend } = require('./base-model');
const pgClient = require('../config/pg-client')

const getUseCasesDetails = async (req, res) => {
    qrystr = `select use_case_id,
    use_case_index_group as use_case_group ,
    use_case_group_desc ,
    priority_label, 
    use_case_color ,
    active_status  from use_case_master_mod where active_status = true order by priority_label`

    return pgbackend(qrystr)
}

module.exports = { getUseCasesDetails }