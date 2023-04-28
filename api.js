const client = require('./connection.js')
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')
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
            if (!err) {

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
        if (!err) {

            for (let index = 0; index < result.rows.length; index++) {
                myobj.data.push({ name: result.rows[index].geographic_area_name, id: result.rows[index].geo_id })
            }

            res.send(myobj);
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
        labelDescQuery = "select use_case_group, use_case_group_desc, use_case_color, priority_label from use_case_master where use_case_group in (" + usecaselabel + ") ORDER BY priority_label";
    }
    else {
        labelDescQuery = "select use_case_group, use_case_group_desc, use_case_color, priority_label from use_case_master ORDER BY priority_label";
    }

    const myArray = usercaselabel1.split(",");

    //console.log(myArray)

    let geographicQuery = '';


    geographicQuery = "select geo_id,ten_year_pop_growth_rate, home_p_to_income, median_income from city_view_2020_updated where geo_id in (" + x + ") and year = 2020 order by geo_id";

    client.query(geographicQuery, (err, result) => {
        if (!err) {

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
                            tenYearPopGrowthRatePercentage = tenYearPopGrowthRate.toFixed(1) + "%";
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
        if (!err) {
            labelDesc.label =
                result.rows

        }
        client.end
    })



    let query = "SELECT geo_id, OR_O, OR_BV, OR_MA, OR_CWYK, OR_YP, OR_R, OR_L FROM index_final_scores_new_1 WHERE geo_id  IN (" + x + ") and publication_year=2020";
    client.query(query, (err, result) => {
        if (!err) {
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
                    if(y.includes("OR_O")){
                        oro = result.rows[index].or_o;
                        value = parseInt(oro);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_O";
                        }
                    }
                    if(y.includes("OR_BV")){
                        orbv =  result.rows[index].or_bv;
                        value = parseInt(orbv);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_BV";
                        }
                    }
                    if(y.includes("OR_MA")){
                        orma =  result.rows[index].or_ma;
                        value = parseInt(orma);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_MA";
                        }
                    }
                    if(y.includes("OR_CWYK")){
                        orcwyk =  result.rows[index].or_cwyk;
                        value = parseInt(orcwyk);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_CWYK";
                        }
                    }
                    if(y.includes("OR_YP")){
                        oryp =  result.rows[index].or_yp;
                        value = parseInt(oryp);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_YP";
                        }
                    }
                    if(y.includes("OR_R")){
                        orr =  result.rows[index].or_r;
                        value = parseInt(orr);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_R";
                        }
                    }
                    if(y.includes("OR_L")){
                        orl =  result.rows[index].or_l;
                        value = parseInt(orl);
                        if(value>max_value){
                            max_value = value;
                            max = "OR_L";
                        }
                    }
                    myobj.data.push({ 
                        geo_id : result.rows[index].geo_id,OR_O : oro, OR_BV : orbv, OR_MA : orma, OR_CWYK : orcwyk, OR_YP : oryp, OR_R : orr, OR_L : orl, max : max 
                    })
                }
            }
            else {
                for (let index = 0; index < result.rows.length; index++) {

                    let max = '';
                    
                    max_value = parseInt(result.rows[index].or_o);
                    max = "OR_O"

                    if(parseInt(result.rows[index].or_bv)>max_value){
                        max_value = parseInt(result.rows[index].or_bv);
                        max = "OR_BV";
                    }
                    if(parseInt(result.rows[index].or_ma)>max_value){
                        max_value = parseInt(result.rows[index].or_ma);
                        max = "OR_MA";
                    }
                    if(parseInt(result.rows[index].or_cwyk)>max_value){
                        max_value = parseInt(result.rows[index].or_cwyk);
                        max = "OR_CWYK";
                    }
                    if(parseInt(result.rows[index].or_yp)>max_value){
                        max_value = parseInt(result.rows[index].or_yp);
                        max = "OR_YP";
                    }
                    if(parseInt(result.rows[index].or_r)>max_value){
                        max_value = parseInt(result.rows[index].or_r);
                        max = "OR_R";
                    }
                    if(parseInt(result.rows[index].or_l)>max_value){
                        max_value = parseInt(result.rows[index].or_l);
                        max = "OR_L";
                    }
                   

                    myobj.data.push({ 
                        geo_id : result.rows[index].geo_id,
                        OR_O : result.rows[index].or_o, 
                        OR_BV : result.rows[index].or_bv, 
                        OR_MA : result.rows[index].or_ma, 
                        OR_CWYK : result.rows[index].or_cwyk, 
                        OR_YP : result.rows[index].or_yp, 
                        OR_R : result.rows[index].or_r, 
                        OR_L : result.rows[index].or_l,
                        max : max
                    })
                    // myObj1.data.push({
                    //     population_growth : 'NA', income_ratio : 'NA', median_income : 'NA'
                    // })
                }
            }

            myobj.label = labelDesc.label;
            myObj2.data = {
                usecase: myobj, general_stat: myobj3
            }
            res.send(myObj2);
            //res.send(result.rows);
        }
    });

    client.end;
})



app.get('/users/usecase', urlencodedParser, (req, res) => {
    //srchStr = req.body && req.body["srch"]
    const obj = { data: [] };
    client.query("select * from use_case_master ORDER BY priority_label", (err, result) => {

        if (!err) {

            for (let index = 0; index < result.rows.length; index++) {
                obj.data.push({ name: result.rows[index].use_case_group_desc, id: result.rows[index].use_case_id, code: result.rows[index].use_case_group, priority: result.rows[index].priority_label, color:result.rows[index].use_case_color })
            }

            res.send(obj);
        }
    });
    client.end;
})









