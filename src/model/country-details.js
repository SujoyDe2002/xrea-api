const { pgbackend } = require('./base-model');
const pgClient = require('../config/pg-client')

const getCountryDetails = async (req, res) => {
    srchStr = req.query && req.query["srch"]
    if (srchStr) {
        qrystr = `select DISTINCT geo_id, geographic_area_name 
        from city_master 
        where geographic_area_name ilike '${srchStr}%'
        and publication_year = 2020` //'" + srchStr + "%' "
        //console.log('qrystr',qrystr)
        return pgbackend(qrystr)
    }
}
module.exports = { getCountryDetails }