const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

async function fetchUserDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM USER_TABLE");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function initiateUserDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE Userr`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE Userr (
                user_id VARCHAR2(50),
                user_name VARCHAR2(255),
                user_note VARCHAR2(255),
                PRIMARY KEY (user_id)
            )`
    );
    console.log("USER_TABLE created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertUserDemotable(user_id, user_name, user_note) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Userr (
                user_id, user_name, user_note
            ) 
            VALUES (
                :user_id, :user_name, :user_note
            )`,
      [user_id, user_name, user_note],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateUserDemotable(user_id, user_name, user_note) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE Userr 
            SET 
                user_name = :user_name,
                user_note = :user_note
            WHERE user_id = :user_id`,
      [user_name, user_note, user_id],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteUserDemotable(user_id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM Userr 
            WHERE user_id = :user_id`,
      [user_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}


module.exports = {
  fetchUserDemotableFromDb,
  initiateUserDemotable,
  insertUserDemotable,
  updateUserDemotable,
  deleteUserDemotable,
};
