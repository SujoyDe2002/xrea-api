const { getSaveSearchDetails, deleteEachSearch, indiviualSearchItem, getLabelDesc, getLabelDesc1, getGeographicAreaName, getMarketSegment, getUseCaseValue, manageSearchResult } = require("../model/search-details");
const { searchdata } = require('../config/configSetup');
const maxDraftedData = searchdata.maxValue;

const getAllSearchList = async (req, res) => {

    let saveSearchList;

    result = await getSaveSearchDetails(req, res);

    const searchObj = {};
    datarow = !result.err && result.rows
    if (datarow) {

        searchObj.response = {
            savedList: datarow,
            maxSavedLength: maxDraftedData
        }
        saveSearchList = searchObj
    }

    if (!saveSearchList) {
        return res.status(404).json({ message: "No save search found" });
    }

    return res.status(200).json(saveSearchList);

}

const eachSearchDelete = async (req, res) => {

    let deleteResponse;

    deleteResponse = await deleteEachSearch(req, res);


    if (!deleteResponse) {
        return res.status(404).json({ message: "Search Not Deleted" });
    }

    return res.status(200).json("Search has Deleted");

}

const searchItem = async (req, res) => {


    srchStr = req.body && req.body["location"]
    srchStr1 = req.body && req.body["usecase"]
    let x;
    let y = "";
    let usecaselabel = "";
    let usercaselabel1 = "";
    const myobj = { data: [], label: [] };
    const myObj1 = { data: [] };
    const myObj2 = {};
    const marketSegmentArrayObj = { data: [] };
    const labelDesc = { label: [] };
    const myobj3 = { data: [] };

    for (let i = 0; i < srchStr.length; i++) {
        if (x) {
            x = x + "," + "'" + srchStr[i].geo_id + "'";
            usercaselabel1 = usercaselabel1 + "," + srchStr[i].geo_id;
        } else {
            x = "'" + srchStr[i].geo_id + "'";
            usercaselabel1 = srchStr[i].geo_id;
        }
    }
    //console.log(x);
    for (let i = 0; i < srchStr1.length; i++) {
        if (y) {
            usecaselabel = usecaselabel + "," + "'" + srchStr1[i].use_case_group + "'";
            y = y + "," + srchStr1[i].use_case_group;
        } else {
            y = srchStr1[i].use_case_group;
            usecaselabel = "'" + srchStr1[i].use_case_group + "'";
        }
    }
    //console.log(y);

    if (y) {
        result = await getLabelDesc(usecaselabel);
    } else {
        result = await getLabelDesc1(usecaselabel);
    }

    datarow3 = !result.err && result.rows;
    //console.log(datarow3)

    if (datarow3) {
        labelDesc.label = datarow3
        //console.log("labelDesc", labelDesc);
    }

    const myArray = usercaselabel1.split(",");

    result = await getGeographicAreaName(x);

    datarow2 = !result.err && result.rows;
    //console.log(datarow2)


    if (datarow2) {

        for (let index = 0; index < myArray.length; index++) {

            flag = false;

            for (let j = 0; j < datarow2.length; j++) {

                if (datarow2[j].geo_id == myArray[index]) {

                    flag = true;

                    //var medianIncome = null;

                    if (datarow2[j].median_income) {

                        medianIncomeCalculation = parseInt(datarow2[j].median_income) / 1000;
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

                //a = String(myArray[index].geo_id);
                myobj3.data.push({
                    geo_id: myArray[index],
                    tenYearPopGrowthRate: "NA",
                    homePToIncome: "NA",
                    medianIncome: "NA"

                })
            }
        }

    }

    result = await getMarketSegment(x);

    datarow1 = !result.err && result.rows;
    //console.log(datarow1)

    if (datarow1) {
        let generalStatGeoId;
        let foundobj;
        // for(let j=0; j< myobj3.data.length;j++){

        for (let i = 0; i < datarow1.length; i++) {
            generalStatGeoId = myobj3.data[i].geo_id;
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
    }

    result = await getUseCaseValue(x);

    datarow = !result.err && result.rows
    //console.log(datarow)

    if (datarow) {
        if (y) {
            for (let index = 0; index < datarow.length; index++) {
                var oro = null;
                let orbv = null;
                let orma = null;
                let orcwyk = null;
                let oryp = null;
                let orr = null;
                let max_value = 0;
                let max = '';
                let statGeoId;
                let currentobj;
                statGeoId = myobj3.data[index].geo_id;
                currentobj = datarow.find(element => element.geo_id == statGeoId);
                if (y.includes("OR_O")) {
                    oro = currentobj.or_o;
                    value = parseInt(oro);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_O";
                    }
                }
                if (y.includes("OR_BV")) {
                    orbv = currentobj.or_bv;
                    value = parseInt(orbv);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_BV";
                    }
                }
                if (y.includes("OR_MA")) {
                    orma = currentobj.or_ma;
                    value = parseInt(orma);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_MA";
                    }
                }
                if (y.includes("OR_CWYK")) {
                    orcwyk = currentobj.or_cwyk;
                    value = parseInt(orcwyk);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_CWYK";
                    }
                }
                if (y.includes("OR_YP")) {
                    oryp = currentobj.or_yp;
                    value = parseInt(oryp);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_YP";
                    }
                }
                if (y.includes("OR_R")) {
                    orr = currentobj.or_r;
                    value = parseInt(orr);
                    if (value > max_value) {
                        max_value = value;
                        max = "OR_R";
                    }
                }
                myobj.data.push({
                    geo_id: currentobj.geo_id, OR_O: oro, OR_BV: orbv, OR_MA: orma, OR_CWYK: orcwyk, OR_YP: oryp, OR_R: orr, max: max
                })


            }
        }
        else {
            for (let index = 0; index < datarow.length; index++) {

                let max = '';
                let statGeoId;
                let currentobj;
                statGeoId = myobj3.data[index].geo_id;
                currentobj = datarow.find(element => element.geo_id == statGeoId);

                max_value = parseInt(currentobj.or_o);
                max = "OR_O"

                if (parseInt(currentobj.or_bv) > max_value) {
                    max_value = parseInt(currentobj.or_bv);
                    max = "OR_BV";
                }
                if (parseInt(currentobj.or_ma) > max_value) {
                    max_value = parseInt(currentobj.or_ma);
                    max = "OR_MA";
                }
                if (parseInt(currentobj.or_cwyk) > max_value) {
                    max_value = parseInt(currentobj.or_cwyk);
                    max = "OR_CWYK";
                }
                if (parseInt(currentobj.or_yp) > max_value) {
                    max_value = parseInt(currentobj.or_yp);
                    max = "OR_YP";
                }
                if (parseInt(currentobj.or_r) > max_value) {
                    max_value = parseInt(currentobj.or_r);
                    max = "OR_R";
                }

                myobj.data.push({
                    geo_id: currentobj.geo_id,
                    OR_O: currentobj.or_o,
                    OR_BV: currentobj.or_bv,
                    OR_MA: currentobj.or_ma,
                    OR_CWYK: currentobj.or_cwyk,
                    OR_YP: currentobj.or_yp,
                    OR_R: currentobj.or_r,
                    max: max
                })

            }
        }
    }

    myobj.label = labelDesc.label;
    //console.log('myObj', myobj)
    myObj2.data = {
        usecase: myobj, general_stat: myobj3, marketSegment: marketSegmentArrayObj
    }

    if (!myObj2) {
        return res.status(404).json({ message: "Search Not found" });
    }
    //console.log('myObj2', myObj2)
    return res.status(200).json(myObj2);



}

const getIndiviualSearchItem = async (req, res) => {

    // const searchObj = {};
    city = [];
    useCase = [];
    result = await indiviualSearchItem(req, res);
   

    datarow = !result.err && result.rows;
    if (datarow) {

        //Geographic Name
        if (datarow[0].geographic_area_name_1 != null && datarow[0].geo_id_1 != null) {
            city.push({ name: datarow[0].geographic_area_name_1, id: datarow[0].geo_id_1 })
        }
        if (datarow[0].geographic_area_name_2 != null && datarow[0].geo_id_2 != null) {
            city.push({ name: datarow[0].geographic_area_name_2, id: datarow[0].geo_id_2 })
        }
        if (datarow[0].geographic_area_name_3 != null && datarow[0].geo_id_3 != null) {
            city.push({ name: datarow[0].geographic_area_name_3, id: datarow[0].geo_id_3 })
        }
        if (datarow[0].geographic_area_name_4 != null && datarow[0].geo_id_4 != null) {
            city.push({ name: datarow[0].geographic_area_name_4, id: datarow[0].geo_id_4 })
        }
        if (datarow[0].geographic_area_name_5 != null && datarow[0].geo_id_5 != null) {
            city.push({ name: datarow[0].geographic_area_name_5, id: datarow[0].geo_id_5 })
        }
        if (datarow[0].geographic_area_name_6 != null && datarow[0].geo_id_6 != null) {
            city.push({ name: datarow[0].geographic_area_name_6, id: datarow[0].geo_id_6 })
        }
        if (datarow[0].geographic_area_name_7 != null && datarow[0].geo_id_7 != null) {
            city.push({ name: datarow[0].geographic_area_name_7, id: datarow[0].geo_id_7 })
        }
        if (datarow[0].geographic_area_name_8 != null && datarow[0].geo_id_8 != null) {
            city.push({ name: datarow[0].geographic_area_name_8, id: datarow[0].geo_id_8 })
        }
        if (datarow[0].geographic_area_name_9 != null && datarow[0].geo_id_9 != null) {
            city.push({ name: datarow[0].geographic_area_name_9, id: datarow[0].geo_id_9 })
        }
        if (datarow[0].geographic_area_name_10 != null && datarow[0].geo_id_10 != null) {
            city.push({ name: datarow[0].geographic_area_name_10, id: datarow[0].geo_id_10 })
        }

        //Usecase
        if (datarow[0].use_case_name_1 != null && datarow[0].use_case_group_1 && datarow[0].use_case_color_1) {
            useCase.push({ name: datarow[0].use_case_name_1, color: datarow[0].use_case_color_1, code: datarow[0].use_case_group_1 })
        } if (datarow[0].use_case_name_2 != null && datarow[0].use_case_group_2 && datarow[0].use_case_color_2) {
            useCase.push({ name: datarow[0].use_case_name_2, color: datarow[0].use_case_color_2, code: datarow[0].use_case_group_2 })
        } if (datarow[0].use_case_name_3 != null && datarow[0].use_case_group_3 && datarow[0].use_case_color_3) {
            useCase.push({ name: datarow[0].use_case_name_3, color: datarow[0].use_case_color_3, code: datarow[0].use_case_group_3 })
        } if (datarow[0].use_case_name_4 != null && datarow[0].use_case_group_4 && datarow[0].use_case_color_4) {
            useCase.push({ name: datarow[0].use_case_name_4, color: datarow[0].use_case_color_4, code: datarow[0].use_case_group_4 })
        } if (datarow[0].use_case_name_5 != null && datarow[0].use_case_group_5 && datarow[0].use_case_color_5) {
            useCase.push({ name: datarow[0].use_case_name_5, color: datarow[0].use_case_color_5, code: datarow[0].use_case_group_5 })
        } if (datarow[0].use_case_name_6 != null && datarow[0].use_case_group_6 && datarow[0].use_case_color_6) {
            useCase.push({ name: datarow[0].use_case_name_6, color: datarow[0].use_case_color_6, code: datarow[0].use_case_group_6 })
        } if (datarow[0].use_case_name_7 != null && datarow[0].use_case_group_7 && datarow[0].use_case_color_7) {
            useCase.push({ name: datarow[0].use_case_name_7, color: datarow[0].use_case_color_7, code: datarow[0].use_case_group_7 })
        } if (datarow[0].use_case_name_8 != null && datarow[0].use_case_group_8 && datarow[0].use_case_color_8) {
            useCase.push({ name: datarow[0].use_case_name_8, color: datarow[0].use_case_color_8, code: datarow[0].use_case_group_8 })
        } if (datarow[0].use_case_name_9 != null && datarow[0].use_case_group_9 && datarow[0].use_case_color_9) {
            useCase.push({ name: datarow[0].use_case_name_9, color: datarow[0].use_case_color_9, code: datarow[0].use_case_group_9 })
        } if (datarow[0].use_case_name_10 != null && datarow[0].use_case_group_10 && datarow[0].use_case_color_10) {
            useCase.push({ name: datarow[0].use_case_name_10, color: datarow[0].use_case_color_10, code: datarow[0].use_case_group_10 })
        }

        searchObj= {
            city, useCase
        }  

        //console.log(searchObj);

        if (!searchObj) {
            return res.status(404).json({ message: "No search Item Found" });
        }

        return res.status(200).json(searchObj);
    }

}

const saveSearch = async (req, res) => {

    srchStr = req.body && req.body["city"]
    srchStr1 = req.body && req.body["usecase"]
    id = req.body && req.body["user_id"]
    username = req.body && req.body["name"]

    for (let i = 0; i < srchStr.length; i++) {
        if (i == 0) {
            geographic_area_name1 = srchStr[i].geographic_area_name;
            geo_id1 = srchStr[i].geoId;
            geaographicAreaLabel = "geographic_area_name_1";
            geoIdLabel = "geo_id_1";
            value_string = `'${geographic_area_name1}'`;
            value_string3 = `'${geo_id1}'`;
        }
        if (i == 1) {
            geographic_area_name2 = srchStr[i].geographic_area_name;
            geo_id2 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_2";
            geoIdLabel = geoIdLabel + ",geo_id_2";
            value_string = value_string + `, '${geographic_area_name2}'`;
            value_string3 = value_string3 + `, '${geo_id2}'`;
        }
        if (i == 2) {
            geographic_area_name3 = srchStr[i].geographic_area_name
            geo_id3 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_3";
            geoIdLabel = geoIdLabel + ",geo_id_3";
            value_string = value_string + `, '${geographic_area_name3}'`;
            value_string3 = value_string3 + `, '${geo_id3}'`;
        }
        if (i == 3) {
            geographic_area_name4 = srchStr[i].geographic_area_name
            geo_id4 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_4";
            geoIdLabel = geoIdLabel + ",geo_id_4";
            value_string = value_string + `, '${geographic_area_name4}'`;
            value_string3 = value_string3 + `, '${geo_id4}'`;
        }
        if (i == 4) {
            geographic_area_name5 = srchStr[i].geographic_area_name
            geo_id5 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_5";
            geoIdLabel = geoIdLabel + ",geo_id_5";
            value_string = value_string + `, '${geographic_area_name5}'`;
            value_string3 = value_string3 + `, '${geo_id5}'`;
        }
        if (i == 5) {
            geographic_area_name6 = srchStr[i].geographic_area_name
            geo_id6 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_6";
            geoIdLabel = geoIdLabel + ",geo_id_6";
            value_string = value_string + `, '${geographic_area_name6}'`;
            value_string3 = value_string3 + `, '${geo_id6}'`;
        }
        if (i == 6) {
            geographic_area_name7 = srchStr[i].geographic_area_name
            geo_id7 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_7";
            geoIdLabel = geoIdLabel + ",geo_id_7";
            value_string = value_string + `, '${geographic_area_name7}'`;
            value_string3 = value_string3 + `, '${geo_id7}'`;
        }
        if (i == 7) {
            geographic_area_name8 = srchStr[i].geographic_area_name
            geo_id8 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_8";
            geoIdLabel = geoIdLabel + ",geo_id_8";
            value_string = value_string + `, '${geographic_area_name8}'`;
            value_string3 = value_string3 + `, '${geo_id8}'`;
        }
        if (i == 8) {
            geographic_area_name9 = srchStr[i].geographic_area_name
            geo_id9 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_9";
            geoIdLabel = geoIdLabel + ",geo_id_9";
            value_string = value_string + `, '${geographic_area_name9}'`;
            value_string3 = value_string3 + `, '${geo_id9}'`;
        }
        if (i == 9) {
            geographic_area_name10 = srchStr[i].geographic_area_name
            geo_id10 = srchStr[i].geoId;
            geaographicAreaLabel = geaographicAreaLabel + ",geographic_area_name_10";
            geoIdLabel = geoIdLabel + ",geo_id_10";
            value_string = value_string + `, '${geographic_area_name10}'`;
            value_string3 = value_string3 + `, '${geo_id10}'`;
        }
    }

    for (let i = 0; i < srchStr1.length; i++) {
        if (i == 0) {
            use_case_name1 = srchStr1[i].name;
            use_case_group1 = srchStr1[i].code;
            use_case_color1 = srchStr1[i].color;
            useCaseLabel = "use_case_name_1";
            useCaseGroup = "use_case_group_1";
            useCaseColor = "use_case_color_1";
            value_string1 = `'${use_case_name1}'`;
            value_string4 = `'${use_case_group1}'`;
            value_string5 = `'${use_case_color1}'`;
        }
        if (i == 1) {
            use_case_name2 = srchStr1[i].name
            use_case_group2 = srchStr1[i].code;
            use_case_color2 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_2";
            useCaseGroup = useCaseGroup + ",use_case_group_2";
            useCaseColor = useCaseColor + ",use_case_color_2";
            value_string1 = value_string1 + `,'${use_case_name2}'`;
            value_string4 = value_string4 + `,'${use_case_group2}'`;
            value_string5 = value_string5 + `,'${use_case_color2}'`;
        }
        if (i == 2) {
            use_case_name3 = srchStr1[i].name;
            use_case_group3 = srchStr1[i].code;
            use_case_color3 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_3";
            useCaseGroup = useCaseGroup + ",use_case_group_3";
            useCaseColor = useCaseColor + ",use_case_color_3";
            value_string1 = value_string1 + `,'${use_case_name3}'`;
            value_string4 = value_string4 + `,'${use_case_group3}'`;
            value_string5 = value_string5 + `,'${use_case_color3}'`;
        }
        if (i == 3) {
            use_case_name4 = srchStr1[i].name
            use_case_group4 = srchStr1[i].code;
            use_case_color4 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_4";
            useCaseGroup = useCaseGroup + ",use_case_group_4";
            useCaseColor = useCaseColor + ",use_case_color_4";
            value_string1 = value_string1 + `,'${use_case_name4}'`;
            value_string4 = value_string4 + `,'${use_case_group4}'`;
            value_string5 = value_string5 + `,'${use_case_color4}'`;
        }
        if (i == 4) {
            use_case_name5 = srchStr1[i].name
            use_case_group5 = srchStr1[i].code;
            use_case_color5 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_5";
            useCaseGroup = useCaseGroup + ",use_case_group_5";
            useCaseColor = useCaseColor + ",use_case_color_5";
            value_string1 = value_string1 + `,'${use_case_name5}'`;
            value_string4 = value_string4 + `,'${use_case_group5}'`;
            value_string5 = value_string5 + `,'${use_case_color5}'`;
        }
        if (i == 5) {
            use_case_name6 = srchStr1[i].name
            use_case_group6 = srchStr1[i].code;
            use_case_color6 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_6";
            useCaseGroup = useCaseGroup + ",use_case_group_6";
            useCaseColor = useCaseColor + ",use_case_color_6";
            value_string1 = value_string1 + `,'${use_case_name6}'`;
            value_string4 = value_string4 + `,'${use_case_group6}'`;
            value_string5 = value_string5 + `,'${use_case_color6}'`;
        }
        if (i == 6) {
            use_case_name7 = srchStr1[i].name
            use_case_group7 = srchStr1[i].code;
            use_case_color7 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_7";
            useCaseGroup = useCaseGroup + ",use_case_group_7";
            useCaseColor = useCaseColor + ",use_case_color_7";
            value_string1 = value_string1 + `,'${use_case_name7}'`;
            value_string4 = value_string4 + `,'${use_case_group7}'`;
            value_string5 = value_string5 + `,'${use_case_color7}'`;
        }
        if (i == 7) {
            use_case_name8 = srchStr1[i].name
            use_case_group8 = srchStr1[i].code;
            use_case_color8 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_8";
            useCaseGroup = useCaseGroup + ",use_case_group_8";
            useCaseColor = useCaseColor + ",use_case_color_8";
            value_string1 = value_string1 + `,'${use_case_name8}'`;
            value_string4 = value_string4 + `,'${use_case_group8}'`;
            value_string5 = value_string5 + `,'${use_case_color8}'`;
        }
        if (i == 8) {
            use_case_name9 = srchStr1[i].name
            use_case_group9 = srchStr1[i].code;
            use_case_color9 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_9";
            useCaseGroup = useCaseGroup + ",use_case_group_9";
            useCaseColor = useCaseColor + ",use_case_color_9";
            value_string1 = value_string1 + `,'${use_case_name9}'`;
            value_string4 = value_string4 + `,'${use_case_group9}'`;
            value_string5 = value_string5 + `,'${use_case_color9}'`;
        }
        if (i == 9) {
            use_case_name10 = srchStr1[i].name
            use_case_group10 = srchStr1[i].code;
            use_case_color10 = srchStr1[i].color;
            useCaseLabel = useCaseLabel + ",use_case_name_10";
            useCaseGroup = useCaseGroup + ",use_case_group_10";
            useCaseColor = useCaseColor + ",use_case_color_10";
            value_string1 = value_string1 + `,'${use_case_name10}'`;
            value_string4 = value_string4 + `,'${use_case_group10}'`;
            value_string5 = value_string5 + `,'${use_case_color10}'`;
        }
    }


    const searchPayload = {
        username: username,
        id: id,
        geaographicAreaLabel: geaographicAreaLabel,
        useCaseLabel: useCaseLabel,
        geoIdLabel: geoIdLabel,
        useCaseGroup: useCaseGroup,
        useCaseColor: useCaseColor,
        value_string: value_string,
        value_string1: value_string1,
        value_string3: value_string3,
        value_string4: value_string4,
        value_string5: value_string5
    }

    countAfterInsert = await manageSearchResult(searchPayload)

    if (!countAfterInsert) {
        return res.status(404).json({ message: "Error in insert" });
    }

    count = countAfterInsert[0].count;

    return res.status(200).json({ saveSearchCount: count });


}

module.exports = { getAllSearchList, eachSearchDelete, searchItem, getIndiviualSearchItem, saveSearch }