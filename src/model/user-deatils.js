const { getUseCasesDetails } = require("../model/use-cases-details");

const mailConfiguration = async (req, res) => {

    requestBody = req.body;
    const { companyName, userName, firstName, lastName, phoneNo, cityList, caseList, mailTo} = req.body;
    const now = new Date();
    let useCaseStr = "";

    if (caseList) {
        useCaseStr = caseList
    } else {
        result = await getUseCasesDetails(req, res);
        datarow = result && result.rows && result.rows.map((u) => u["use_case_group_desc"])
        useCaseStr = datarow && datarow.join(`, `)
    }
    
    message = {
        from: 'kirtibiswas2198@gmail.com',
        to: mailTo,
        subject: `Market Study Request From ${companyName}`,
        html: `
            <h1>User Name : ${userName}</h1>
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
            <h1>List of Use Cases Searched Before Submitting : ${useCaseStr}</h1>
            </br>
            <h1>Submit Timestamp : ${now}</h1>
            </br>
        `
    }
    return message;
}

module.exports = { mailConfiguration }