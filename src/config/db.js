const { Pool } = require('pg');

let ssl_value="";
if (process.env.NODE_ENV==='development'){
    ssl_value=true;
}
else{
    ssl_value=false;
}

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl:ssl_value, /* Solo con render externo */
    allowExitOnIdle: true
})

module.exports = pool;