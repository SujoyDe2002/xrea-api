const { getCountryDetails } = require("../model/country-details");
const { getUseCasesDetails } = require("../model/use-cases-details");
const { response } = require("../response/responseMsg")
const httpStatusCodes = require("../constants/httpStatusCodesCons")



const getAllCountries = async (req, res) => {
    let countries;
    const countryObj = [];

    try {

        result = await getCountryDetails(req, res);

        datarow = !result.err && result.rows
        if (datarow) {
            for (let index = 0; index < datarow.length; index++) {
                countryObj.push({
                    name: datarow[index].geographic_area_name,
                    id: datarow[index].geo_id,
                })
            }
            countries = countryObj
        }

        return res.status(200).json(countries);

    } catch (err) {
        console.log(err);

    }

}

const getAllUseCases = async (req, res) => {

    let usecases;
    const usecaseObj = [];

    try {

        result = await getUseCasesDetails(req, res);

        datarow = !result.err && result.rows

        if (datarow) {
            for (let index = 0; index < datarow.length; index++) {
                usecaseObj.push({
                    name: datarow[index].use_case_group_desc,
                    id: datarow[index].use_case_id,
                    code: datarow[index].use_case_group,
                    priority: datarow[index].priority_label,
                    color: datarow[index].use_case_color
                })
            }
            usecases = usecaseObj
        }
        return res.status(200).json(usecases);
    } catch (err) {
        console.log(err);
    }

}

module.exports = { getAllCountries, getAllUseCases }