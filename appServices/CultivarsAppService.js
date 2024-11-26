const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Initialize the Cultivar table
async function initiateCultivarTable() {
  return await withOracleDB(async (connection) => {
    try {
      // Drop the table if it exists
      await connection.execute(`DROP TABLE CULTIVAR`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    // Create the Cultivar table
    await connection.execute(
      `CREATE TABLE CULTIVAR (
         plant_ID INTEGER PRIMARY KEY,
        cultivar_name VARCHAR(50),
        FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID)
      )`
    );

    console.log("CULTIVAR table created successfully!");
    return true;
  }).catch((err) => {
    console.error("Error initiating Cultivar table:", err);
    return false;
  });
}

// Insert a new record into the Cultivar table
async function insertCultivar(plant_ID, cultivar_name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO CULTIVAR (plant_ID, cultivar_name) 
       VALUES (:plant_ID, :cultivar_name)`,
      [plant_ID, cultivar_name],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error inserting cultivar:", err);
    return false;
  });
}

// Fetch all records from the Cultivar table
async function fetchCultivarsFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT   Cultivar.plant_ID, 
                Plant.yield_type, 
                Plant.common_name, 
                Plant.scientific_name,
                Plant.overview_notes,
                Cultivar.cultivar_name 
       FROM CULTIVAR, Plant
       WHERE Cultivar.plant_ID = Plant.plant_ID`
    );
    return result.rows;
  }).catch((err) => {
    console.error("Error fetching cultivars:", err);
    return [];
  });
}

// Update a record in the Cultivar table
async function updateCultivar(plant_ID, cultivar_name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE CULTIVAR 
       SET cultivar_name = :cultivar_name
       WHERE plant_ID = :plant_ID`,
      [cultivar_name, plant_ID],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error updating cultivar:", err);
    return false;
  });
}

// Delete a record from the Cultivar table
async function deleteCultivar(plant_ID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM CULTIVAR 
       WHERE plant_ID = :plant_ID`,
      [plant_ID],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error deleting cultivar:", err);
    return false;
  });
}

// Count the total number of records in the Cultivar table
// async function countCultivars() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`SELECT COUNT(*) AS count FROM CULTIVAR`);
//     return result.rows[0]?.COUNT || 0;
//   }).catch((err) => {
//     console.error("Error counting cultivars:", err);
//     return null;
//   });
// }

module.exports = {
  initiateCultivarTable,
  insertCultivar,
  fetchCultivarsFromDb,
  updateCultivar,
  deleteCultivar,
//   countCultivars,
};
