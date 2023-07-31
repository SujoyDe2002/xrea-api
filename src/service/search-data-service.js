const { useCaseFetchByCode } = require("../model/search-details");
const cluster_details = async (datarow1, geographicNameObj) => {
    let generalStatGeoId;
    let foundobj;
    let marketSegmentArrayObj = { data: [] };

    for (let i = 0; i < datarow1.length; i++) {
        generalStatGeoId = geographicNameObj.data[i].geo_id;
        foundobj = datarow1.find(element => element.geo_id == generalStatGeoId);

        geographic_Id = foundobj.geo_id

        if (foundobj.cluster_name == null) {
            clusterName = "Cluster NA";
        } else {
            clusterName = foundobj.cluster_name;
        }

        if (foundobj.cluster_desc == null) {
            cluster_desc = "Cluster Description NA";
        } else {
            cluster_desc = foundobj.cluster_desc
        }


        marketSegmentArrayObj.data.push({
            geo_id: geographic_Id, clusterName: clusterName, cluster_desc: cluster_desc
        })

    }

    return marketSegmentArrayObj;
}

const getGeographicAreaName_details = async (myArray, datarow2) => {
    let myobj3 = { data: [] };

    for (let index = 0; index < myArray.length; index++) {

        flag = false;

        for (let j = 0; j < datarow2.length; j++) {

            if (datarow2[j].geo_id == myArray[index]) {

                flag = true;

                if (datarow2[j].median_income) {

                    medianIncomeCalculation = parseFloat(datarow2[j].median_income) / 1000;
                    medianIncomeCalculation = parseFloat(medianIncomeCalculation).toFixed(1)
                    medianIncome = "$" + medianIncomeCalculation + "k";
                } else {
                    medianIncome = "NA"
                }

                if (datarow2[j].home_p_to_income) {

                    homeptoincomeCalculation = parseFloat(datarow2[j].home_p_to_income).toFixed(1);
                    homePToIncome = homeptoincomeCalculation
                } else {
                    homePToIncome = "NA"
                }

                if (datarow2[j].ten_year_pop_growth_rate) {

                    tenYearPopGrowthRate = parseFloat(datarow2[j].ten_year_pop_growth_rate);
                    tenYearPopGrowthRate = Math.abs(tenYearPopGrowthRate) * 100;
                    tenYearPopGrowthRatePercentage = tenYearPopGrowthRate.toFixed(2) + "%";
                    tenYearPopGrowthRate = tenYearPopGrowthRatePercentage
                }
                else {
                    tenYearPopGrowthRate = "NA"
                }

                myobj3.data.push({

                    geo_id: datarow2[j].geo_id,
                    tenYearPopGrowthRate: tenYearPopGrowthRate,
                    homePToIncome: homePToIncome,
                    medianIncome: medianIncome

                })

            }

        }
        if (flag == false) {

            myobj3.data.push({
                geo_id: myArray[index],
                tenYearPopGrowthRate: "NA",
                homePToIncome: "NA",
                medianIncome: "NA"

            })
        }
    }
    return myobj3;
}

const segmentValueWithUsecase = async (dataRowAllSegmentValue,y,labelDesc) => {
    
    const myobj = { data: [], label: [] };

    if(y){
        for (let i = 0; i < dataRowAllSegmentValue.length; i++) {
            let oro = null, orbv = null, orma = null, orcwyk = null, orr = null, oryp = null, max_value = 0, max = '';
            geo_id = dataRowAllSegmentValue[i].geo_id;
            if (y.includes('OR_O')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_o);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_O";
                }
                oro = {
                    "index": dataRowAllSegmentValue[i].or_o,
                    "percentile": dataRowAllSegmentValue[i].overall_residential_percentile,
                    "grade": dataRowAllSegmentValue[i].overall_residential_grade
                }
            }
            if (y.includes('OR_BV')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_bv);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_BV";
                }
                orbv = {
                    "index": dataRowAllSegmentValue[i].or_bv,
                    "percentile": dataRowAllSegmentValue[i].mfr_best_value_percentile,
                    "grade": dataRowAllSegmentValue[i].mfr_best_value_grade
                }
            }
            if (y.includes('OR_MA')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_ma);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_MA";
                }
                orma = {
                    "index": dataRowAllSegmentValue[i].or_ma,
                    "percentile": dataRowAllSegmentValue[i].mfr_affordable_percentile,
                    "grade": dataRowAllSegmentValue[i].mfr_affordable_grade
                }
            }
            if (y.includes('OR_CWYK')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_cwyk);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_CWYK";
                }
                orcwyk = {
                    "index": dataRowAllSegmentValue[i].or_cwyk,
                    "percentile": dataRowAllSegmentValue[i].mfr_cwyk_percentile,
                    "grade": dataRowAllSegmentValue[i].mfr_cwyk_grade
                }
            }
            if (y.includes('OR_R')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_r);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_R";
                }
                orr = {
                    "index": dataRowAllSegmentValue[i].or_r,
                    "percentile": dataRowAllSegmentValue[i].mfr_retirees_percentile,
                    "grade": dataRowAllSegmentValue[i].mfr_retirees_grade
                }
            }
            if (y.includes('OR_YP')) {
                value = parseFloat(dataRowAllSegmentValue[i].or_yp);
                if (value > max_value) {
                    max_value = value;
                    max = "OR_YP";
                }
                oryp = {
                    "index": dataRowAllSegmentValue[i].or_yp,
                    "percentile": dataRowAllSegmentValue[i].mfr_yp_percentile,
                    "grade": dataRowAllSegmentValue[i].mfr_yp_grade
                }
            }
            myobj.data.push({
                geo_id: geo_id, OR_O: oro, OR_BV: orbv, OR_MA: orma, OR_CWYK: orcwyk, OR_R: orr, OR_YP: oryp, max: max
            })
        }
    }else{
        for (let i = 0; i < dataRowAllSegmentValue.length; i++) {
            let oro = null, orbv = null, orma = null, orcwyk = null, orr = null, oryp = null, max = null, max_value = 0;
            let geo_id = dataRowAllSegmentValue[i].geo_id;
            max_value = parseFloat(dataRowAllSegmentValue[i].or_o);
            max = "OR_O"

            if (parseFloat(dataRowAllSegmentValue[i].or_bv) > max_value) {
                max_value = parseFloat(dataRowAllSegmentValue[i].or_bv);
                max = "OR_BV"
            }
            if (parseFloat(dataRowAllSegmentValue[i].or_ma) > max_value) {
                max_value = parseFloat(dataRowAllSegmentValue[i].or_ma);
                max = "OR_MA"
            }
            if (parseFloat(dataRowAllSegmentValue[i].or_cwyk) > max_value) {
                max_value = parseFloat(dataRowAllSegmentValue[i].or_cwyk);
                max = "OR_CWYK"
            }
            if (parseFloat(dataRowAllSegmentValue[i].or_r) > max_value) {
                max_value = parseFloat(dataRowAllSegmentValue[i].or_r);
                max = "OR_R"
            }
            if (parseFloat(dataRowAllSegmentValue[i].or_yp) > max_value) {
                max_value = parseFloat(dataRowAllSegmentValue[i].or_yp);
                max = "OR_YP"
            }
            oro = {
                "index": dataRowAllSegmentValue[i].or_o,
                "percentile": dataRowAllSegmentValue[i].overall_residential_percentile,
                "grade": dataRowAllSegmentValue[i].overall_residential_grade
            }
            orbv = {
                "index": dataRowAllSegmentValue[i].or_bv,
                "percentile": dataRowAllSegmentValue[i].mfr_best_value_percentile,
                "grade": dataRowAllSegmentValue[i].mfr_best_value_grade
            }
            orma = {
                "index": dataRowAllSegmentValue[i].or_ma,
                "percentile": dataRowAllSegmentValue[i].mfr_affordable_percentile,
                "grade": dataRowAllSegmentValue[i].mfr_affordable_grade
            }
            orcwyk = {
                "index": dataRowAllSegmentValue[i].or_cwyk,
                "percentile": dataRowAllSegmentValue[i].mfr_cwyk_percentile,
                "grade": dataRowAllSegmentValue[i].mfr_cwyk_grade
            }
            orr = {
                "index": dataRowAllSegmentValue[i].or_r,
                "percentile": dataRowAllSegmentValue[i].mfr_retirees_percentile,
                "grade": dataRowAllSegmentValue[i].mfr_retirees_grade
            }
            oryp = {
                "index": dataRowAllSegmentValue[i].or_yp,
                "percentile": dataRowAllSegmentValue[i].mfr_yp_percentile,
                "grade": dataRowAllSegmentValue[i].mfr_yp_grade
            }
            myobj.data.push({
                geo_id: geo_id, OR_O: oro, OR_BV: orbv, OR_MA: orma, OR_CWYK: orcwyk, OR_R: orr, OR_YP: oryp, max: max
            })
        }
    }

    myobj.label = labelDesc.label;

    return myobj;
}

const allDataFetchByIdAndType = async (datarow) => {

    let searchObj = {};
    searchValue = datarow[0];
    useCaseOfEachSegment = [];

    if (searchValue.geographic_area_name_1 != null && searchValue.geo_id_1 != null) {
        city.push({ name: searchValue.geographic_area_name_1, id: searchValue.geo_id_1 })
    }
    if (searchValue.geographic_area_name_2 != null && searchValue.geo_id_2 != null) {
        city.push({ name: searchValue.geographic_area_name_2, id: searchValue.geo_id_2 })
    }
    if (searchValue.geographic_area_name_3 != null && searchValue.geo_id_3 != null) {
        city.push({ name: searchValue.geographic_area_name_3, id: searchValue.geo_id_3 })
    }
    if (searchValue.geographic_area_name_4 != null && searchValue.geo_id_4 != null) {
        city.push({ name: searchValue.geographic_area_name_4, id: searchValue.geo_id_4 })
    }
    if (searchValue.geographic_area_name_5 != null && searchValue.geo_id_5 != null) {
        city.push({ name: searchValue.geographic_area_name_5, id: searchValue.geo_id_5 })
    }
    if (searchValue.geographic_area_name_6 != null && searchValue.geo_id_6 != null) {
        city.push({ name: searchValue.geographic_area_name_6, id: searchValue.geo_id_6 })
    }
    if (searchValue.geographic_area_name_7 != null && searchValue.geo_id_7 != null) {
        city.push({ name: searchValue.geographic_area_name_7, id: searchValue.geo_id_7 })
    }
    if (searchValue.geographic_area_name_8 != null && searchValue.geo_id_8 != null) {
        city.push({ name: searchValue.geographic_area_name_8, id: searchValue.geo_id_8 })
    }
    if (searchValue.geographic_area_name_9 != null && searchValue.geo_id_9 != null) {
        city.push({ name: searchValue.geographic_area_name_9, id: searchValue.geo_id_9 })
    }
    if (searchValue.geographic_area_name_10 != null && searchValue.geo_id_10 != null) {
        city.push({ name: searchValue.geographic_area_name_10, id: searchValue.geo_id_10 })
    }

    //Usecase
    if (searchValue.use_case_group_1) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_1]
    } if (searchValue.use_case_group_2) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_2]
    } if (searchValue.use_case_group_3) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_3]

    } if (searchValue.use_case_group_4) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_4]

    } if (searchValue.use_case_group_5) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_5]

    } if (searchValue.use_case_group_6) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_6]

    } if (searchValue.use_case_group_7) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_7]

    } if (searchValue.use_case_group_8) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_8]

    } if (searchValue.use_case_group_9) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_9]

    } if (searchValue.use_case_group_10) {
        useCaseOfEachSegment = [...useCaseOfEachSegment, searchValue.use_case_group_10]

    }

    const datesWrappedInQuotes = useCaseOfEachSegment.map(element => `'${element}'`);
    const withCommasInBetween = datesWrappedInQuotes.join(',')
    result = await useCaseFetchByCode(withCommasInBetween);
    useCase = !result.err && result.rows;

    searchObj = {
        city, useCase
    }

    return searchObj;
}

module.exports = {
    cluster_details,
    getGeographicAreaName_details,
    segmentValueWithUsecase,
    allDataFetchByIdAndType
}