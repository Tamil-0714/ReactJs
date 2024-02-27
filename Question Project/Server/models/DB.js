const mysql = require("mysql2");

function connectDB() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "tamil",
    password: "For_My_196",
    database: "question_app",
    waitForConnections: true,
    connectionLimit: 10,
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
    console.error(error);
  }
}

async function fetchQuestion() {
  console.log("fetch question called");
  try {
    return await queryDB("select * from questions");
  } catch (error) {
    console.error(error);
  }
}
async function fetchUsers(id) {
  // console.log("fetch users called");
  console.log(Math.random()*10);
  try {
    return await queryDB(`select * from users where userId = "${id}"`);
  } catch (error) {
    console.error(error);
  }
}
async function fetchAnswers(key) {
  console.log("fetch answers called");
  try {
    return await queryDB(
      `select answers from users where privateKey = "${key}"`
    );
  } catch (error) {
    console.error(error);
  }
}
async function fetchUsersWithKey(key) {
  console.log("fetch users with key called");
  try {
    return await queryDB(`select * from users where privateKey = "${key}"`);
  } catch (error) {
    console.error(error);
  }
}
async function insertUserKey(usrky, id) {
  console.log("fetch insert user key called");
  try {
    return await queryDB(
      `update users set privateKey="${usrky}" where userId = "${id}"`
    );
  } catch (error) {
    console.error(error);
  }
}
async function insertAnswer(ans, key) {
  console.log("fetch insert answer called");
  try {
    return await queryDB(
      `update users set answers='${ans}' where privateKey = "${key}"`
    );
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  fetchUsers,
  fetchQuestion,
  insertUserKey,
  fetchUsersWithKey,
  fetchAnswers,
  insertAnswer
};
