const {Client} = require('pg')

//const client = new Client({
//    host : "192.168.1.141",
//    user : "postgres",
//    port : 5432,
//    password : "Manna@2023",
//    database : "XREA"
//})
const client = new Client({
    host: "xrea-india-postgres.postgres.database.azure.com",
    user: "xreaadmin@xrea-india-postgres",
    port: 5432,
    password: "xr34-4dm1n-0e2K5!",
    database: "postgres"
})
module.exports = client


