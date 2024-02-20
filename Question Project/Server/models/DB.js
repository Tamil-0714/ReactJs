const mysql = require("mysql2");

function connectDB() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "tamil",
    password: "For_My_196",
    database: "question_app",
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
  });
  return pool.promise();
}

async function queryDB(query) {
  try {
    const connection = await connectDB();
    const [rows] = await connection.query(query);
    connection.releaseConnection();
    return rows;
  } catch (error) {
    throw error;
  }
}

async function fetchQuestion() {
  try {
    return await queryDB("select * from questions");
  } catch (error) {
    throw error;
  }
}
async function fetchUsers(id) {
  try {
    return await queryDB(`select * from users where userId = "${id}"`);
  } catch (error) {
    throw error;
  }
}
async function insertUserKey(usrky, id) {
  try {
    return await queryDB(
      `update users set privateKey="${usrky}" where userId = "${id}"`
    );
  } catch (error) {
    throw error
  }
}
module.exports = { fetchUsers, fetchQuestion, insertUserKey };