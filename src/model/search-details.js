const { pgbackend, executeTransaction } = require('./base-model');
const { searchdata } = require('../config/configSetup');
const maxDraftedData = searchdata.maxValue;

const getSaveSearchDetails = async (req, res) => {

    let userId = req.query && req.query["user_id"];

    if (userId) {
        qrystr = `select user_id, save_search_title, save_search_id,created_on 
        from save_search_criteria where user_id = '${userId}' and 
        active_status='true' and user_type = 'USER' order by updation_date desc`
        return pgbackend(qrystr)
    }

}

const deleteEachSearch = async (req, res) => {

    let saveSearchId = req.body && req.body["searchId"];


    if (saveSearchId) {
        qrystr = `DELETE FROM save_search_criteria where save_search_id=${saveSearchId}`
        return pgbackend(qrystr)
    }

}

const indiviualSearchItem = async (req, res) => {

    srchId = req.body && req.body["saveSearchId"];
    type = req.body && req.body["type"]
    let queryString = "";

    if (type === 'GUEST') {
        queryString = `select * from save_search_criteria where save_search_id = ${srchId} and active_status='true' and user_type = 'GUEST'`;
    } else {
        queryString = `select * from save_search_criteria where save_search_id = ${srchId} and active_status='true' and user_type = 'USER'`;
    }

    return pgbackend(queryString)

}

const getLabelDesc = async (usecaselabel) => {
    let queryString = `select use_case_index_group as use_case_group, use_case_group_desc,use_case_color,priority_label
    from use_case_master_mod 
    where use_case_index_group in (${usecaselabel}) 
    and active_status = true 
    ORDER BY priority_label`

    return pgbackend(queryString);


}

const getLabelDesc1 = async (usecaselabel) => {
    let queryString = `select use_case_index_group as use_case_group, use_case_group_desc,use_case_color,priority_label
    from use_case_master_mod
    where active_status = true 
    ORDER BY priority_label`

    return pgbackend(queryString);


}

const getGeographicAreaName = async (x) => {
    let geographicQuery = `select geo_id,ten_year_pop_growth_rate, home_p_to_income, median_income from city_view_2020_updated 
    where geo_id in (${x}) and year = 2020 
    order by geo_id`;

    return pgbackend(geographicQuery);
}

const getMarketSegment = async (x) => {
    let marketSegmentQuery = `select t1.geo_id,cluster_name,cluster_desc, cluster_code from 
    (SELECT index_final_scores_mod.geo_id,
     index_final_scores_mod.cluster_id,
     index_final_scores_mod.publication_year,
     cluster_master_mod.cluster_name,
     cluster_master_mod.cluster_desc,
     cluster_master_mod.cluster_code
     FROM index_final_scores_mod LEFT JOIN cluster_master_mod ON index_final_scores_mod.cluster_id = cluster_master_mod.cluster_id) t1 
     where t1.geo_id in (${x}) and t1.publication_year = 2021`;

    return pgbackend(marketSegmentQuery);
}

const getUseCaseValue = async (x) => {
    let queryString = `SELECT geo_id, OR_O, OR_BV, OR_MA, OR_CWYK, OR_YP, OR_R, OR_L 
    FROM index_final_scores 
    WHERE geo_id  IN (${x}) and publication_year=2020`;

    return pgbackend(queryString);
}

const getAlllUsecaseDetails = async (usecaselabel) => {
    let queryString;

    queryString = `select use_case_index_group, use_case_percentile_group, use_case_grade_group, use_case_index_alias from use_case_master_mod 
    where use_case_index_group in (${usecaselabel})`;

    return pgbackend(queryString);
}

const getAllUsecaseDetailsWithoutUsecase = async () => {

    let queryString = `select use_case_index_group, use_case_percentile_group, use_case_grade_group, use_case_index_alias from use_case_master_mod where active_status = true`;

    return pgbackend(queryString);
}

const getAllSergmentData = async (concatingUsecase, x) => {

    let queryString = `select geo_id, ${concatingUsecase} from index_final_scores_mod 
    where geo_id in (${x})`;

    return pgbackend(queryString);
}



const manageSearchResult = async (searchPayload) => {
    const s = searchPayload
    let rowsdata = {}
    let querystring = `select count(*) from save_search_criteria where user_id='${s['id']}' and active_status='true' and user_type = 'USER'`;
    await executeTransaction(async (client) => {
        const { rows } = await client.query(querystring);
        if (rows && rows.length > 0) {
            countBeforeInsert = rows[0].count;
            if (countBeforeInsert < maxDraftedData) {
                let insertQuery = `insert into save_search_criteria(user_id, save_search_title, 
                ${s['geaographicAreaLabel']}, ${s['useCaseLabel']}, ${s['geoIdLabel']},${s['useCaseGroup']},${s['useCaseColor']},created_by, updated_by,user_type) 
                 values
                 ('${s['id']}','${s['username']}',${s['value_string']},${s['value_string1']},
                 ${s['value_string3']},${s['value_string4']},${s['value_string5']},1,1,'USER')`

                const insertResponse = await client.query(insertQuery);

                const { rows } = await client.query(querystring);
                rowsdata = rows

            }
        }

    });
    return rowsdata
}

const isAvailable = async (username, id) => {
    let queryString = `SELECT count(*) FROM save_search_criteria WHERE user_id='${id}' and save_search_title='${username}'`;

    return pgbackend(queryString);
}

const useCaseFetchByCode = async (useCase) => {

    let queryString = `select  use_case_index_group as use_case_group ,
    use_case_group_desc ,
    priority_label, 
    use_case_color ,
    active_status  from use_case_master_mod where use_case_index_group in (${useCase})  and active_status = true`;

    return pgbackend(queryString);
}


module.exports = {
    getSaveSearchDetails,
    deleteEachSearch,
    indiviualSearchItem,
    getLabelDesc,
    getLabelDesc1,
    getGeographicAreaName,
    getMarketSegment,
    getUseCaseValue,
    manageSearchResult,
    isAvailable,
    useCaseFetchByCode,
    getAlllUsecaseDetails,
    getAllSergmentData,
    getAllUsecaseDetailsWithoutUsecase
}