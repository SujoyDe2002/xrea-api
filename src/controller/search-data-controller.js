const { getSaveSearchDetails, getAlllUsecaseDetails, getAllSergmentData, deleteEachSearch, indiviualSearchItem, getLabelDesc, getLabelDesc1, getGeographicAreaName, getMarketSegment, getUseCaseValue, manageSearchResult, isAvailable, useCaseFetchByCode, getAllUsecaseDetailsWithoutUsecase } = require("../model/search-details");
const { cluster_details, getGeographicAreaName_details, segmentValueWithUsecase, allDataFetchByIdAndType } = require('../service/search-data-service');
const { searchdata } = require('../config/configSetup');
const { response } = require("../response/responseMsg");
const httpStatusCodes = require("../constants/httpStatusCodesCons");
const { LogContextImpl } = require("twilio/lib/rest/serverless/v1/service/environment/log");
const maxDraftedData = searchdata.maxValue;

const getAllSearchList = async (req, res) => {

    let saveSearchList;
    const searchObj = {};

    try {
        result = await getSaveSearchDetails(req, res);


        datarow = !result.err && result.rows
        if (datarow) {

            searchObj.response = {
                savedList: datarow,
                maxSavedLength: maxDraftedData
            }
            saveSearchList = searchObj
        }

        return res.status(200).json(saveSearchList);

    } catch (err) {

        console.log(err);

    }

}

const eachSearchDelete = async (req, res) => {


    try {

        result = await deleteEachSearch(req, res);

        if (result) {
            return res.status(200).json("data deleted Successfully");
        }



    } catch (err) {
        console.log(err);
    }

}

const searchItem = async (req, res) => {


    srchStr = req.body && req.body["location"]
    srchStr1 = req.body && req.body["usecase"]
    let x;
    let concatingUsecase;
    let y = "";
    let usecaselabel = "";
    let usercaselabel1 = "";
    let xreaUsecaseValueDetails = {};
    const labelDesc = { label: [] };
    let clusterObj = {};
    let geographicNameObj = {};
    let allSegmentDataObj = {};


    try {

        if (srchStr && srchStr.length > 0) {
            for (let i = 0; i < srchStr.length; i++) {
                if (x) {
                    x = x + "," + "'" + srchStr[i].geo_id + "'";
                    usercaselabel1 = usercaselabel1 + "," + srchStr[i].geo_id;
                } else {
                    x = "'" + srchStr[i].geo_id + "'";
                    usercaselabel1 = srchStr[i].geo_id;
                }
            }
            for (let i = 0; i < srchStr1.length; i++) {
                if (y) {
                    usecaselabel = usecaselabel + "," + "'" + srchStr1[i].use_case_group + "'";
                    y = y + "," + srchStr1[i].use_case_group;
                } else {
                    y = srchStr1[i].use_case_group;
                    usecaselabel = "'" + srchStr1[i].use_case_group + "'";
                }
            }


            if (y) {
                result = await getLabelDesc(usecaselabel);
            } else {
                result = await getLabelDesc1(usecaselabel);
            }

            datarow3 = !result.err && result.rows;

            if (datarow3) {
                labelDesc.label = datarow3
            }

            const myArray = usercaselabel1.split(",");

            result = await getGeographicAreaName(x);

            datarow2 = !result.err && result.rows;
            if (datarow2) {
                geographicNameObj = await getGeographicAreaName_details(myArray, datarow2);
            }

            result = await getMarketSegment(x);

            datarow1 = !result.err && result.rows;

            if (datarow1) {
                clusterObj = await cluster_details(datarow1, geographicNameObj);
            }

            if (usecaselabel) {
                result = await getAlllUsecaseDetails(usecaselabel);
            } else {
                result = await getAllUsecaseDetailsWithoutUsecase();
            }

            datarowAllUsecase = !result.err && result.rows;

            for (let index = 0; index < datarowAllUsecase.length; index++) {

                if (concatingUsecase) {
                    concatingUsecase = concatingUsecase + ' , ' + datarowAllUsecase[index].use_case_index_group + ' , ' + datarowAllUsecase[index].use_case_percentile_group + ' , ' + datarowAllUsecase[index].use_case_grade_group;
                } else {
                    concatingUsecase = datarowAllUsecase[index].use_case_index_group + ' , ' + datarowAllUsecase[index].use_case_percentile_group + ' , ' + datarowAllUsecase[index].use_case_grade_group;
                }

            }

            result = await getAllSergmentData(concatingUsecase, x);

            dataRowAllSegmentValue = !result.err && result.rows;

            allSegmentDataObj = await segmentValueWithUsecase(dataRowAllSegmentValue, y, labelDesc);

            xreaUsecaseValueDetails.data = {
                usecase: allSegmentDataObj, general_stat: geographicNameObj, marketSegment: clusterObj
            }


            return res.status(200).json(xreaUsecaseValueDetails);

        }

    } catch (err) {
        console.log(err);

    }

}

const getIndiviualSearchItem = async (req, res) => {

    city = [];
    useCase = [];
    useCaseOfEachSegment = [];

    try {

        result = await indiviualSearchItem(req, res);

        datarow = !result.err && result.rows;
        if (datarow) {

            searchObj = await allDataFetchByIdAndType(datarow);

            return res.status(200).json(searchObj);
        }

    } catch (err) {
        console.log(err);
    }

}

const saveSearch = async (req, res) => {

    srchStr = req.body && req.body["city"]
    srchStr1 = req.body && req.body["usecase"]
    id = req.body && req.body["user_id"]
    username = req.body && req.body["name"]
    let count;

    try {

        if (username) {
            for (let i = 0; i < srchStr.length; i++) {
                if (i == 0) {
                    geaographicAreaLabel = `geographic_area_name_${i + 1}`;
                    geoIdLabel = `geo_id_${i + 1}`;
                    value_string = `'${srchStr[i].geographic_area_name}'`;
                    value_string3 = `'${srchStr[i].geoId}'`;
                } else {
                    geaographicAreaLabel = geaographicAreaLabel + `,geographic_area_name_${i + 1}`;
                    geoIdLabel = geoIdLabel + `,geo_id_${i + 1}`;
                    value_string = value_string + `, '${srchStr[i].geographic_area_name}'`;
                    value_string3 = value_string3 + `, '${srchStr[i].geoId}'`;
                }
            }

            for (let i = 0; i < srchStr1.length; i++) {
                if (i == 0) {
                    useCaseLabel = `use_case_name_${i + 1}`;
                    useCaseGroup = `use_case_group_${i + 1}`;
                    useCaseColor = `use_case_color_${i + 1}`;
                    value_string1 = `'${srchStr1[i].name}'`;
                    value_string4 = `'${srchStr1[i].code}'`;
                    value_string5 = `'${srchStr1[i].color}'`;
                } else {
                    useCaseLabel = useCaseLabel + `,use_case_name_${i + 1}`;
                    useCaseGroup = useCaseGroup + `,use_case_group_${i + 1}`;
                    useCaseColor = useCaseColor + `,use_case_color_${i + 1}`;
                    value_string1 = value_string1 + `,'${srchStr1[i].name}'`;
                    value_string4 = value_string4 + `,'${srchStr1[i].code}'`;
                    value_string5 = value_string5 + `,'${srchStr1[i].color}'`;
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

            isTitleNameAvailable = await isAvailable(username, id);
            isTitleNameCount = isTitleNameAvailable.rows[0].count;

            if (isTitleNameCount > 0) {
                return res.status(200).json({ code: 409, message: "Name already exists! Try with different name." });
            } else {
                countAfterInsert = await manageSearchResult(searchPayload)

                count = countAfterInsert[0].count
                return res.status(200).json({ code: 200, saveSearchCount: count, message: "Search saved successfully!" });
            }
        }
    } catch (err) {
        console.log(err);
    }

}

module.exports = { getAllSearchList, eachSearchDelete, searchItem, getIndiviualSearchItem, saveSearch }