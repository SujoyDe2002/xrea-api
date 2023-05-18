const {Client} = require('pg')

const client = new Client({
    host : "192.168.1.141",
    user : "postgres",
    port : 5432,
    password : "Manna@2023",
    database : "XREA"
})

module.exports = client


