const { getCountryDetails } = require("../model/country-details");
const { getUseCasesDetails } = require("../model/use-cases-details");


const getAllCountries = async (req, res) => {
    let countries;
    //srchStr = req.query && req.query["srch"]
    result = await getCountryDetails(req, res);
    const countryObj = { data: [] };
    datarow = !result.err && result.rows
    if (datarow) {
        //console.log('dataresp',datarow)
        for (let index = 0; index < datarow.length; index++) {
            countryObj.data.push({ name: datarow[index].geographic_area_name, id: datarow[index].geo_id })
        }
        countries = countryObj
    }

    if (!countries) {
        return res.status(404).json({ message: "No countries found" });
    }

    return res.status(200).json(countries);
}

const getAllUseCases = async (req, res) => {
    let usecases;
    result = await getUseCasesDetails(req, res);
    const usecaseObj = { data: [] };
    datarow = !result.err && result.rows

    if (datarow) {
        //console.log('dataresp',datarow)
        for (let index = 0; index < datarow.length; index++) {
            usecaseObj.data.push({ name: datarow[index].use_case_group_desc, id: datarow[index].use_case_id, code: datarow[index].use_case_group, priority: datarow[index].priority_label, color: datarow[index].use_case_color })
        }
        usecases = usecaseObj
    }

    if (!usecases) {
        return res.status(404).json({ message: "No usecases found" });
    }

    return res.status(200).json(usecases);
}

module.exports = { getAllCountries, getAllUseCases }