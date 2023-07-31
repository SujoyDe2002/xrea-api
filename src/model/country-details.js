const { pgbackend } = require('./base-model');
const pgClient = require('../config/pg-client')

const getCountryDetails = async (req, res) => {
    let srchStr = req.body && req.body["srch"]
    //srchStr1 = req.body && req.body["searchState"]

    if (srchStr) {
        qrystr = `select DISTINCT geo_id, geographic_area_name, state_name, city_name 
        from city_master 
        where geographic_area_name ilike '${srchStr}%' and active_status = true
        and publication_year = 2021`


        return pgbackend(qrystr)
    }


}
module.exports = { getCountryDetails }