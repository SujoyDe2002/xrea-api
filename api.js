const client = require('./connection.js')
const express = require('express')
const bodyParser = require("body-parser");
const nodeMailer = require('nodemailer');
const cors = require('cors');
const { query } = require('express');
const { searchdata } = require('./configsetup.js');
const maxDraftedData = searchdata.maxValue;
const port = 3011;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

app.listen(port, () => {
    console.log("server is now listening at port" + port);
})

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))



client.connect();

app.use(bodyParser.json());

app.get('/users/search/city', urlencodedParser, (req, res) => {
    srchStr = req.query && req.query["srch"]

    const myobj = { data: [] };
    if (srchStr)
        client.query("select DISTINCT geo_id, geographic_area_name from city_master where geographic_area_name ilike '" + srchStr + "%' and publication_year = 2020", (err, result) => {
            if (!err && result.rows) {

                //res.send(result.rows);
                for (let index = 0; index < result.rows.length; index++) {
                    myobj.data.push({ name: result.rows[index].geographic_area_name, id: result.rows[index].geo_id })
                }

                res.send(myobj);
            }
        });
    client.end;
})


app.get('/users/geographicAreaName', urlencodedParser, (req, res) => {
    //srchStr = req.body && req.body["srch"]
    const myobj = { data: [] };

    client.query("select geo_id, geographic_area_name from city_master", (err, result) => {
        try {
            if (!err && result.rows) {

                for (let index = 0; index < result.rows.length; index++) {
                    myobj.data.push({ name: result.rows[index].geographic_area_name, id: result.rows[index].geo_id })
                }

                // res.send(myobj);
                res.status(200).send(myobj);
                // console.log("Hi");
            }
        }
        catch (err) {
            res.status(400).send('Internal Server Error');
            console.log(err);
        }

    });

    client.end;



})

app.post('/search', urlencodedParser, (req, res) => {
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
    const myobj3 = { data: [] };
    const labelDesc = { label: [] };
    //const obj = JSON.parse(srchStr);


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
    let labelDescQuery = '';
    if (y) {
        labelDescQuery = "select use_case_group, use_case_group_desc, use_case_color, priority_label from use_case_master where use_case_group in (" + usecaselabel + ") and active_status = true ORDER BY priority_label";
    }
    else {
        labelDescQuery = "select use_case_group, use_case_group_desc, use_case_color, priority_label from use_case_master where active_status = true ORDER BY priority_label";
    }

    const myArray = usercaselabel1.split(",");

    //console.log(myArray)

    let geographicQuery = '';


    geographicQuery = "select geo_id,ten_year_pop_growth_rate, home_p_to_income, median_income from city_view_2020_updated where geo_id in (" + x + ") and year = 2020 order by geo_id";

    client.query(geographicQuery, (err, result) => {
        if (!err && result.rows) {

            for (let index = 0; index < myArray.length; index++) {

                flag = false;

                for (let j = 0; j < result.rows.length; j++) {

                    if (result.rows[j].geo_id == myArray[index]) {

                        flag = true;

                        //var medianIncome = null;

                        if (result.rows[j].median_income) {

                            medianIncomeCalculation = parseInt(result.rows[j].median_income) / 1000;
                            medianIncomeCalculation = parseFloat(medianIncomeCalculation).toFixed(1)
                            medianIncome = "$" + medianIncomeCalculation + "k";
                        } else {
                            medianIncome = "NA"
                        }

                        if (result.rows[j].home_p_to_income) {

                            homeptoincomeCalculation = parseFloat(result.rows[j].home_p_to_income).toFixed(1);
                            homePToIncome = homeptoincomeCalculation
                        } else {
                            homePToIncome = "NA"
                        }

                        if (result.rows[j].ten_year_pop_growth_rate) {

                            tenYearPopGrowthRate = parseFloat(result.rows[j].ten_year_pop_growth_rate);
                            tenYearPopGrowthRate = Math.abs(tenYearPopGrowthRate) * 100;
                            tenYearPopGrowthRatePercentage = tenYearPopGrowthRate.toFixed(2) + "%";
                            tenYearPopGrowthRate = tenYearPopGrowthRatePercentage
                        }
                        else {
                            tenYearPopGrowthRate = "NA"
                        }

                        myobj3.data.push({

                            geo_id: result.rows[j].geo_id,
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
        client.end
    })

    client.query(labelDescQuery, (err, result) => {
        if (!err && result.rows) {
            labelDesc.label = result.rows
        }
        client.end
    })

    let marketSegmentQuery = "select t1.geo_id,cluster_name,cluster_desc from (SELECT index_final_scores.geo_id,index_final_scores.cluster_id,index_final_scores.publication_year,cluster_master.cluster_name,cluster_master.cluster_desc FROM index_final_scores LEFT JOIN cluster_master ON index_final_scores.cluster_id = cluster_master.cluster_id) t1 where t1.geo_id in (" + x + ") and t1.publication_year = 2020";

    client.query(marketSegmentQuery, (err, result) => {
        // marketSegmentObj = result.rows;
        if (!err && result.rows) {
            let generalStatGeoId;
            let foundobj;
            // for(let j=0; j< myobj3.data.length;j++){

            for (let i = 0; i < result.rows.length; i++) {
                generalStatGeoId = myobj3.data[i].geo_id;
                foundobj = result.rows.find(element => element.geo_id == generalStatGeoId);

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
        client.end
    })


    let query = "SELECT geo_id, OR_O, OR_BV, OR_MA, OR_CWYK, OR_YP, OR_R, OR_L FROM index_final_scores WHERE geo_id  IN (" + x + ") and publication_year=2020";
    client.query(query, (err, result) => {
        if (!err && result.rows) {
            if (y) {
                for (let index = 0; index < result.rows.length; index++) {
                    var oro = null;
                    let orbv = null;
                    let orma = null;
                    let orcwyk = null;
                    let oryp = null;
                    let orr = null;
                    let orl = null;
                    let max_value = 0;
                    let max = '';
                    let statGeoId;
                    let currentobj;
                    statGeoId = myobj3.data[index].geo_id;
                    currentobj = result.rows.find(element => element.geo_id == statGeoId);
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
                    if (y.includes("OR_L")) {
                        orl = currentobj.or_l;
                        value = parseInt(orl);
                        if (value > max_value) {
                            max_value = value;
                            max = "OR_L";
                        }
                    }
                    myobj.data.push({
                        geo_id: currentobj.geo_id, OR_O: oro, OR_BV: orbv, OR_MA: orma, OR_CWYK: orcwyk, OR_YP: oryp, OR_R: orr, OR_L: orl, max: max
                    })


                }
            }
            else {
                for (let index = 0; index < result.rows.length; index++) {

                    let max = '';
                    let statGeoId;
                    let currentobj;
                    statGeoId = myobj3.data[index].geo_id;
                    currentobj = result.rows.find(element => element.geo_id == statGeoId);

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
                    if (parseInt(currentobj.or_l) > max_value) {
                        max_value = parseInt(currentobj.or_l);
                        max = "OR_L";
                    }


                    myobj.data.push({
                        geo_id: currentobj.geo_id,
                        OR_O: currentobj.or_o,
                        OR_BV: currentobj.or_bv,
                        OR_MA: currentobj.or_ma,
                        OR_CWYK: currentobj.or_cwyk,
                        OR_YP: currentobj.or_yp,
                        OR_R: currentobj.or_r,
                        OR_L: currentobj.or_l,
                        max: max
                    })

                }
            }

            myobj.label = labelDesc.label;
            myObj2.data = {
                usecase: myobj, general_stat: myobj3, marketSegment: marketSegmentArrayObj
            }
            res.send(myObj2);

        }
    });

    client.end;
})



app.get('/users/usecase', urlencodedParser, (req, res) => {
    //srchStr = req.body && req.body["srch"]
    const obj = { data: [] };
    client.query("select * from use_case_master where active_status = true order by priority_label ", (err, result) => {

        if (!err && result.rows) {

            for (let index = 0; index < result.rows.length; index++) {
                obj.data.push({ name: result.rows[index].use_case_group_desc, id: result.rows[index].use_case_id, code: result.rows[index].use_case_group, priority: result.rows[index].priority_label, color: result.rows[index].use_case_color })
            }

            res.send(obj);
        }
    });
    client.end;
})


app.post('/sendMail', async (req, res) => {
    var x = 'kirti'
    var y = 'diptyojit'

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kirtibiswas2198@gmail.com',
            pass: 'ytuwdjhkznyhckkd'
        }
    })

    message = mailConfiguration(req);

    const info = await transporter.sendMail(message);

    if (info) {
        const successObj = { statuscode: 200 };
        res.status(200).send(successObj);
    } else {
        unsuccessObj = { statuscode: 400 };
        res.status(400).send(unsuccessObj);
    }

})

function mailConfiguration(req) {
    companyName = req.body && req.body["companyName"];
    username = req.body && req.body["userName"];
    firstName = req.body && req.body["firstName"];
    lastName = req.body && req.body["lastName"];
    phoneNo = req.body && req.body["phoneNo"];
    cityList = req.body && req.body["cityList"];
    CaseList = req.body && req.body["caseList"];
    mailTo = req.body && req.body["mailTo"];
    const now = new Date();

    message = {
        from: 'kirtibiswas2198@gmail.com',
        to: mailTo,
        subject: `Market Study Request From ${companyName}`,
        html: `
            <h1>User Name : ${username}</h1>
            </br>
            <h1>User First Name : ${firstName} , User Last Name :  ${lastName}</h1>
            </br>
            <h1>User Email : ${mailTo}</h1>
            </br>
            <h1>User Phone Number : ${phoneNo}</h1>
            </br>
            <h1>Company Name : ${companyName}</h1>
            </br>
            <h1>List of Last Cities Searched Before Submitting : ${cityList}</h1>
            </br>
            <h1>List of Use Cases Searched Before Submitting : ${CaseList}</h1>
            </br>
            <h1>Submit Timestamp : ${now}</h1>
            </br>
        `
    }
    return message;
}



app.post('/saveSearch', (req, res) => {
    srchStr = req.body && req.body["city"]
    srchStr1 = req.body && req.body["usecase"]
    let id = req.body && req.body["user_id"]
    //const user = req.body;
    var geographic_area_name1 = null;
    var geographic_area_name2 = null;
    var geographic_area_name3 = null;
    var geographic_area_name4 = null;
    var geographic_area_name5 = null;
    var geographic_area_name6 = null;
    var geographic_area_name7 = null;
    var geographic_area_name8 = null;
    var geographic_area_name9 = null;
    var geographic_area_name10 = null;
    var use_case_name1 = null;
    var use_case_name2 = null;
    var use_case_name3 = null;
    var use_case_name4 = null;
    var use_case_name5 = null;
    var use_case_name6 = null;
    var use_case_name7 = null;
    var use_case_name8 = null;
    var use_case_name9 = null;
    var use_case_name10 = null;
    //const successObj ={ };
    let b = "";
    let c = "";
    let l = "";
    let j = "";
    let count = 0;


    var date = new Date("YYYY-MM-DD HH:mm:ss");

    for (let i = 0; i < srchStr.length; i++) {
        if (i == 0) {
            geographic_area_name1 = srchStr[i].geographic_area_name;
            geo_id1 = srchStr[i].geoId;
            b = "geographic_area_name_1";
            d = "geo_id_1";
            value_string = `'${geographic_area_name1}'`;
            value_string3 = `'${geo_id1}'`;
        }
        if (i == 1) {
            geographic_area_name2 = srchStr[i].geographic_area_name;
            geo_id2 = srchStr[i].geoId;
            b = b + ",geographic_area_name_2";
            d = d + ",geo_id_2";
            value_string = value_string + `, '${geographic_area_name2}'`;
            value_string3 = value_string3 + `, '${geo_id2}'`;
        }
        if (i == 2) {
            geographic_area_name3 = srchStr[i].geographic_area_name
            geo_id3 = srchStr[i].geoId;
            b = b + ",geographic_area_name_3";
            d = d + ",geo_id_3";
            value_string = value_string + `, '${geographic_area_name3}'`;
            value_string3 = value_string3 + `, '${geo_id3}'`;
        }
        if (i == 3) {
            geographic_area_name4 = srchStr[i].geographic_area_name
            geo_id4 = srchStr[i].geoId;
            b = b + ",geographic_area_name_4";
            d = d + ",geo_id_4";
            value_string = value_string + `, '${geographic_area_name4}'`;
            value_string3 = value_string3 + `, '${geo_id4}'`;
        }
        if (i == 4) {
            geographic_area_name5 = srchStr[i].geographic_area_name
            geo_id5 = srchStr[i].geoId;
            b = b + ",geographic_area_name_5";
            d = d + ",geo_id_5";
            value_string = value_string + `, '${geographic_area_name5}'`;
            value_string3 = value_string3 + `, '${geo_id5}'`;
        }
        if (i == 5) {
            geographic_area_name6 = srchStr[i].geographic_area_name
            geo_id6 = srchStr[i].geoId;
            b = b + ",geographic_area_name_6";
            d = d + ",geo_id_6";
            value_string = value_string + `, '${geographic_area_name6}'`;
            value_string3 = value_string3 + `, '${geo_id6}'`;
        }
        if (i == 6) {
            geographic_area_name7 = srchStr[i].geographic_area_name
            geo_id7 = srchStr[i].geoId;
            b = b + ",geographic_area_name_7";
            d = d + ",geo_id_7";
            value_string = value_string + `, '${geographic_area_name7}'`;
            value_string3 = value_string3 + `, '${geo_id7}'`;
        }
        if (i == 7) {
            geographic_area_name8 = srchStr[i].geographic_area_name
            geo_id8 = srchStr[i].geoId;
            b = b + ",geographic_area_name_8";
            d = d + ",geo_id_8";
            value_string = value_string + `, '${geographic_area_name8}'`;
            value_string3 = value_string3 + `, '${geo_id8}'`;
        }
        if (i == 8) {
            geographic_area_name9 = srchStr[i].geographic_area_name
            geo_id9 = srchStr[i].geoId;
            b = b + ",geographic_area_name_9";
            d = d + ",geo_id_9";
            value_string = value_string + `, '${geographic_area_name9}'`;
            value_string3 = value_string3 + `, '${geo_id9}'`;
        }
        if (i == 9) {
            geographic_area_name10 = srchStr[i].geographic_area_name
            geo_id10 = srchStr[i].geoId;
            b = b + ",geographic_area_name_10";
            d = d + ",geo_id_10";
            value_string = value_string + `, '${geographic_area_name10}'`;
            value_string3 = value_string3 + `, '${geo_id10}'`;
        }
    }
    for (let i = 0; i < srchStr1.length; i++) {
        if (i == 0) {
            use_case_name1 = srchStr1[i].name;
            use_case_group1 = srchStr1[i].code;
            use_case_color1 = srchStr1[i].color;
            c = "use_case_name_1";
            e = "use_case_group_1";
            f = "use_case_color_1";
            value_string1 = `'${use_case_name1}'`;
            value_string4 = `'${use_case_group1}'`;
            value_string5 = `'${use_case_color1}'`;
        }
        if (i == 1) {
            use_case_name2 = srchStr1[i].name
            use_case_group2 = srchStr1[i].code;
            use_case_color2 = srchStr1[i].color;
            c = c + ",use_case_name_2";
            e = e + ",use_case_group_2";
            f = f + ",use_case_color_2";
            value_string1 = value_string1 + `,'${use_case_name2}'`;
            value_string4 = value_string4 + `,'${use_case_group2}'`;
            value_string5 = value_string5 + `,'${use_case_color2}'`;
        }
        if (i == 2) {
            use_case_name3 = srchStr1[i].name;
            use_case_group3 = srchStr1[i].code;
            use_case_color3 = srchStr1[i].color;
            c = c + ",use_case_name_3";
            e = e + ",use_case_group_3";
            f = f + ",use_case_color_3";
            value_string1 = value_string1 + `,'${use_case_name3}'`;
            value_string4 = value_string4 + `,'${use_case_group3}'`;
            value_string5 = value_string5 + `,'${use_case_color3}'`;
        }
        if (i == 3) {
            use_case_name4 = srchStr1[i].name
            use_case_group4 = srchStr1[i].code;
            use_case_color4 = srchStr1[i].color;
            c = c + ",use_case_name_4";
            e = e + ",use_case_group_4";
            f = f + ",use_case_color_4";
            value_string1 = value_string1 + `,'${use_case_name4}'`;
            value_string4 = value_string4 + `,'${use_case_group4}'`;
            value_string5 = value_string5 + `,'${use_case_color4}'`;
        }
        if (i == 4) {
            use_case_name5 = srchStr1[i].name
            use_case_group5 = srchStr1[i].code;
            use_case_color5 = srchStr1[i].color;
            c = c + ",use_case_name_5";
            e = e + ",use_case_group_5";
            f = f + ",use_case_color_5";
            value_string1 = value_string1 + `,'${use_case_name5}'`;
            value_string4 = value_string4 + `,'${use_case_group5}'`;
            value_string5 = value_string5 + `,'${use_case_color5}'`;
        }
        if (i == 5) {
            use_case_name6 = srchStr1[i].name
            use_case_group6 = srchStr1[i].code;
            use_case_color6 = srchStr1[i].color;
            c = c + ",use_case_name_6";
            e = e + ",use_case_group_6";
            f = f + ",use_case_color_6";
            value_string1 = value_string1 + `,'${use_case_name6}'`;
            value_string4 = value_string4 + `,'${use_case_group6}'`;
            value_string5 = value_string5 + `,'${use_case_color6}'`;
        }
        if (i == 6) {
            use_case_name7 = srchStr1[i].name
            use_case_group7 = srchStr1[i].code;
            use_case_color7 = srchStr1[i].color;
            c = c + ",use_case_name_7";
            e = e + ",use_case_group_7";
            f = f + ",use_case_color_7";
            value_string1 = value_string1 + `,'${use_case_name7}'`;
            value_string4 = value_string4 + `,'${use_case_group7}'`;
            value_string5 = value_string5 + `,'${use_case_color7}'`;
        }
        if (i == 7) {
            use_case_name8 = srchStr1[i].name
            use_case_group8 = srchStr1[i].code;
            use_case_color8 = srchStr1[i].color;
            c = c + ",use_case_name_8";
            e = e + ",use_case_group_8";
            f = f + ",use_case_color_8";
            value_string1 = value_string1 + `,'${use_case_name8}'`;
            value_string4 = value_string4 + `,'${use_case_group8}'`;
            value_string5 = value_string5 + `,'${use_case_color8}'`;
        }
        if (i == 8) {
            use_case_name9 = srchStr1[i].name
            use_case_group9 = srchStr1[i].code;
            use_case_color9 = srchStr1[i].color;
            c = c + ",use_case_name_9";
            e = e + ",use_case_group_9";
            f = f + ",use_case_color_9";
            value_string1 = value_string1 + `,'${use_case_name9}'`;
            value_string4 = value_string4 + `,'${use_case_group9}'`;
            value_string5 = value_string5 + `,'${use_case_color9}'`;
        }
        if (i == 9) {
            use_case_name10 = srchStr1[i].name
            use_case_group10 = srchStr1[i].code;
            use_case_color10 = srchStr1[i].color;
            c = c + ",use_case_name_10";
            e = e + ",use_case_group_10";
            f = f + ",use_case_color_10";
            value_string1 = value_string1 + `,'${use_case_name10}'`;
            value_string4 = value_string4 + `,'${use_case_group10}'`;
            value_string5 = value_string5 + `,'${use_case_color10}'`;
        }
    }



    const querystring = `select count(*) from save_search_criteria where user_id='${id}' and active_status='true' and user_type = 'USER'`;

    client.query(querystring, (err, result) => {
        if (!err && result.rows) {

            count = result.rows[0].count

            if (count < maxDraftedData) {
                let insertQuery = `insert into save_search_criteria(user_id, save_search_title, ${b}, ${c}, ${d},${e},${f},created_by, updated_by,user_type) 
                    values` + `(${req.body.user_id}, '${req.body.name}',` + value_string + `,` + value_string1 + `,` + value_string3 + `,` + value_string4 + `,` + value_string5 + `,1,1,'USER')`;

                // console.log(insertQuery);
                client.query(insertQuery, (err, result) => {
                    if (!err) {

                        client.query(querystring, (err, result) => {
                            if (!err) {
                                successObj = { statuscode: 200, noOfSavedSearch: result.rows[0].count };
                                res.status(200).send(successObj);
                            }
                        });
                    }
                    else {
                        console.log(err.message)
                    }
                });
            } else {
                unsuccessObj = { statuscode: 400 };
                res.status(400).send(unsuccessObj);
            }
        }
    });



})

// app.post('/getSearchItem/Guest', urlencodedParser, (req, res) => {
//     srchId = req.body && req.body["saveSearchId"]
//     type = req.body && req.body["type"]
//     city = [];
//     useCase = [];

//     if (type === 'GUEST') {
//         if (srchId === 1) {
//             obj = {

//                 city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' }],
//                 useCase: [

//                     { name: 'Young Professionals', color: '#00479D', code: 'OR_YP' },
//                     { name: 'Couples with Young Kids', color: '#8190BB', code: 'OR_CWYK' }
//                 ]
//             }
//             res.status(200).send(obj);
//         }
//         else if (srchId === 2) {
//             obj = {
//                 city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' }],
//                 useCase: []
//             }

//             res.status(200).send(obj);
//         }

//         else if (srchId === 3) {
//             obj = {
//                 city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' },
//                 { name: 'Chicago city, Illinois', id: '1600000US1714000' },
//                 { name: 'Springfield city, Illinois', id: '1600000US1772000' }],
//                 useCase: [


//                     { name: 'Young Professionals', color: '#00479D', code: 'OR_YP' },
//                     { name: 'Couples with Young Kids', color: '#8190BB', code: 'OR_CWYK' }
//                 ]
//             }
//             res.status(200).send(obj);
//         }

//     }
// });


app.get('/searchList', urlencodedParser, (req, res) => {
    //srchStr = req.query && req.query["srch"]
    let a = req.query && req.query["user_id"];

    const myObj2 = {};
    if (a)
        client.query("select user_id, save_search_title, save_search_id,created_on from save_search_criteria where user_id = '" + a + "'and active_status='true' and user_type = 'USER' order by updation_date desc", (err, result) => {
            if (!err && result.rows) {

                //res.send(result.rows);
                myObj2.response = {
                    savedList: result.rows,
                    maxSavedLength: maxDraftedData
                }

                res.send(myObj2);
            }
        });
    client.end;
})

app.post('/searchDelete', urlencodedParser, (req, res) => {
    srchStr = req.body && req.body["userId"]
    srchStr1 = req.body && req.body["searchName"]

    const queryDelete = `Update save_search_criteria set active_status='false' where user_id='${srchStr}' and save_search_title='${srchStr1}' `

    client.query(queryDelete, (err, result) => {
        if (!err) {


            successObj = { statuscode: 200 };
            res.status(200).send(successObj);


        } else {

            unsuccessObj = { statuscode: 400 }
            res.status(400).send(unsuccessObj);

        }

    });
    client.end;
})

app.post('/getSearchItem', urlencodedParser, (req, res) => {
    //srchStr = req.body && req.body["srch"]
    srchId = req.body && req.body["saveSearchId"];
    type = req.body && req.body["type"]
    city = [];
    useCase = [];
    let queryString = "";
    if (type === 'GUEST') {
        queryString = "select * from save_search_criteria where save_search_id = " + srchId + " and active_status='true' and user_type = 'GUEST'";
    } else {
        queryString = "select * from save_search_criteria where save_search_id = " + srchId + " and active_status='true' and user_type = 'USER'";
    }
    client.query(queryString, (err, result) => {

        if (!err && result.rows) {

            //city
            if (result.rows[0].geographic_area_name_1 != null && result.rows[0].geo_id_1 != null) {
                city.push({ name: result.rows[0].geographic_area_name_1, id: result.rows[0].geo_id_1 })
            }
            if (result.rows[0].geographic_area_name_2 != null && result.rows[0].geo_id_2 != null) {
                city.push({ name: result.rows[0].geographic_area_name_2, id: result.rows[0].geo_id_2 })
            }
            if (result.rows[0].geographic_area_name_3 != null && result.rows[0].geo_id_3 != null) {
                city.push({ name: result.rows[0].geographic_area_name_3, id: result.rows[0].geo_id_3 })
            }
            if (result.rows[0].geographic_area_name_4 != null && result.rows[0].geo_id_4 != null) {
                city.push({ name: result.rows[0].geographic_area_name_4, id: result.rows[0].geo_id_4 })
            }
            if (result.rows[0].geographic_area_name_5 != null && result.rows[0].geo_id_5 != null) {
                city.push({ name: result.rows[0].geographic_area_name_5, id: result.rows[0].geo_id_5 })
            }
            if (result.rows[0].geographic_area_name_6 != null && result.rows[0].geo_id_6 != null) {
                city.push({ name: result.rows[0].geographic_area_name_6, id: result.rows[0].geo_id_6 })
            }
            if (result.rows[0].geographic_area_name_7 != null && result.rows[0].geo_id_7 != null) {
                city.push({ name: result.rows[0].geographic_area_name_7, id: result.rows[0].geo_id_7 })
            }
            if (result.rows[0].geographic_area_name_8 != null && result.rows[0].geo_id_8 != null) {
                city.push({ name: result.rows[0].geographic_area_name_8, id: result.rows[0].geo_id_8 })
            }
            if (result.rows[0].geographic_area_name_9 != null && result.rows[0].geo_id_9 != null) {
                city.push({ name: result.rows[0].geographic_area_name_9, id: result.rows[0].geo_id_9 })
            }
            if (result.rows[0].geographic_area_name_10 != null && result.rows[0].geo_id_10 != null) {
                city.push({ name: result.rows[0].geographic_area_name_10, id: result.rows[0].geo_id_10 })
            }

            //usecase
            if (result.rows[0].use_case_name_1 != null && result.rows[0].use_case_group_1 && result.rows[0].use_case_color_1) {
                useCase.push({ name: result.rows[0].use_case_name_1, color: result.rows[0].use_case_color_1, code: result.rows[0].use_case_group_1 })
            } if (result.rows[0].use_case_name_2 != null && result.rows[0].use_case_group_2 && result.rows[0].use_case_color_2) {
                useCase.push({ name: result.rows[0].use_case_name_2, color: result.rows[0].use_case_color_2, code: result.rows[0].use_case_group_2 })
            } if (result.rows[0].use_case_name_3 != null && result.rows[0].use_case_group_3 && result.rows[0].use_case_color_3) {
                useCase.push({ name: result.rows[0].use_case_name_3, color: result.rows[0].use_case_color_3, code: result.rows[0].use_case_group_3 })
            } if (result.rows[0].use_case_name_4 != null && result.rows[0].use_case_group_4 && result.rows[0].use_case_color_4) {
                useCase.push({ name: result.rows[0].use_case_name_4, color: result.rows[0].use_case_color_4, code: result.rows[0].use_case_group_4 })
            } if (result.rows[0].use_case_name_5 != null && result.rows[0].use_case_group_5 && result.rows[0].use_case_color_5) {
                useCase.push({ name: result.rows[0].use_case_name_5, color: result.rows[0].use_case_color_5, code: result.rows[0].use_case_group_5 })
            } if (result.rows[0].use_case_name_6 != null && result.rows[0].use_case_group_6 && result.rows[0].use_case_color_6) {
                useCase.push({ name: result.rows[0].use_case_name_6, color: result.rows[0].use_case_color_6, code: result.rows[0].use_case_group_6 })
            } if (result.rows[0].use_case_name_7 != null && result.rows[0].use_case_group_7 && result.rows[0].use_case_color_7) {
                useCase.push({ name: result.rows[0].use_case_name_7, color: result.rows[0].use_case_color_7, code: result.rows[0].use_case_group_7 })
            } if (result.rows[0].use_case_name_8 != null && result.rows[0].use_case_group_8 && result.rows[0].use_case_color_8) {
                useCase.push({ name: result.rows[0].use_case_name_8, color: result.rows[0].use_case_color_8, code: result.rows[0].use_case_group_8 })
            } if (result.rows[0].use_case_name_9 != null && result.rows[0].use_case_group_9 && result.rows[0].use_case_color_9) {
                useCase.push({ name: result.rows[0].use_case_name_9, color: result.rows[0].use_case_color_9, code: result.rows[0].use_case_group_9 })
            } if (result.rows[0].use_case_name_10 != null && result.rows[0].use_case_group_10 && result.rows[0].use_case_color_10) {
                useCase.push({ name: result.rows[0].use_case_name_10, color: result.rows[0].use_case_color_10, code: result.rows[0].use_case_group_10 })
            }

            searchObj = {
                city, useCase
            }

            //res.send(result.rows);

            //successObj = {statuscode : 200};
            res.status(200).send(searchObj);

        }

        else {
            console.log(err);
        }
    });
    client.end;


})














