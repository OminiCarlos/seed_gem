const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Add new services below
async function resetSoilConditionsTable() {
  return await withOracleDB(async (connection) => {
    try {
      // Drop the existing table
      await connection.execute(`DROP TABLE SOIL_CONDITIONS`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      // Create the SOIL_CONDITIONS table
      `CREATE TABLE Soil_condition (
            soil_type VARCHAR(50) PRIMARY KEY,
            pH NUMBER(5, 2),
            organic_matter_concentration NUMBER(5, 2)
        `
    );

    console.log("SOIL_CONDITIONS table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertSoilCondition(soil_type, ph, organic_matter) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // Insert a new soil condition entry
      `INSERT INTO SOIL_CONDITION (soil_type, ph, organic_matter_concentration) 
                        VALUES (:soil_type, :ph, :organic_matter_concentration)`,
      [soil_type, ph, organic_matter],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetchSoilConditionsFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
      SELECT soil_type, pH, organic_matter_concentration
      FROM SOIL_CONDITION
    `);

    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function updateSoilCondition(soil_type, ph, organic_matter) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // Update the soil condition entry
      `UPDATE SOIL_CONDITION 
         SET ph = :ph, organic_matter_concentration = :organic_matter
         WHERE soil_type = :soil_type`,
      [ph, organic_matter, soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteSoilCondition(soil_type) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // Delete the soil condition entry
      `DELETE FROM SOIL_CONDITION 
         WHERE soil_type = :soil_type`,
      [soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

// async function countSoilConditions() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`
//       SELECT COUNT(*) AS COUNT
//       FROM SOIL_CONDITIONS
//     `);

//     return result.rows[0]?.COUNT || 0;
//   }).catch(() => {
//     return null;
//   });
// }

async function filterSoilConditions(conditions) {
  return await withOracleDB(async (connection) => {
    const query = `SELECT soil_type, pH, organic_matter_concentration
                   FROM Soil_condition
                   WHERE ${conditions}`;
    const result = await connection.execute(query);
    return result.rows;
  }).catch((error) => {
    console.error("Error filtering soil conditions:", error);
    throw error; // Rethrow the error to be handled in the controller
  });
}


module.exports = {
  resetSoilConditionsTable: resetSoilConditionsTable,
  insertSoilCondition: insertSoilCondition,
  fetchSoilConditionsFromDb: fetchSoilConditionsFromDb,
  updateSoilCondition: updateSoilCondition,
  deleteSoilCondition: deleteSoilCondition,
  filterSoilConditions: filterSoilConditions,
//   countSoilConditions: countSoilConditions,
};
