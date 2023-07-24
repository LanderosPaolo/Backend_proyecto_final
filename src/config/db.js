const { Pool } = require('pg');

let  ssl_value;
if (process.env.NODE_ENV='production'){
    ssl_value=false;
    console.log("Base de datos interna. ")
}
else{
    ssl_value=true;
    console.log("Base de datos externa. ")
}

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl:ssl_value, /* Solo con render externo */
    allowExitOnIdle: true
})

module.exports = pool;