const mysql2 = require("mysql2");

function connectDB() {
  const pool = mysql2.createPool({
    host: "localhost",
    user: "tamil",
    password: "For_My_196",
    database: "peoples",
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
    throw error;
  }
}

async function fetchUsers() {
  try {
    return await queryDB("select * from user");
  } catch (error) {
    throw error;
  }
}

module.exports = {fetchUsers:fetchUsers};
