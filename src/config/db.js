const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DB_URL);
module.exports = sql;