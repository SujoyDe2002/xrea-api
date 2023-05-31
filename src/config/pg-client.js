const { Client } = require('pg')

const pgClient = new Client({
    host: "192.168.1.141",
    user: "postgres",
    port: 5432,
    password: "Manna@2023",
    database: "XREA"
})

/*const pgClient = new Client({
    host: "xrea-india-postgres.postgres.database.azure.com",
    user: "xreaadmin@xrea-india-postgres",
    port: 5432,
    password: "xr34-4dm1n-0e2K5!",
    database: "postgres"
})*/

pgClient.connect()
module.exports = pgClient

