const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// above should be unchanged

// adding new services from here!

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT * 
       FROM Plant`
    ); // replace with a join sql statement
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      // change the table name to drop.
      await connection.execute(`DROP TABLE LOCATION`);
    } catch (err) {
      // put the respective table name to help debugging.
      console.log("Plant Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      // change the table name and field. The order of field names follows that in seed_gem.sql
      `
      CREATE TABLE Plant (
        plant_ID INTEGER PRIMARY KEY,
        yield_type VARCHAR(50),
        common_name VARCHAR(50) UNIQUE,
        scientific_name VARCHAR(50) UNIQUE,
        overview_notes VARCHAR(3000)
        );
      `
    );
    // change this to your table name
    console.log("Plant table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// 
async function insertDemotable(
  // change these to the attributes in your table.
  plant_id,
  yield_type,
  common_name,
  scientific_name,
  overview_notes
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change the attributes and the variable names.
      `INSERT INTO Plant (
        plant_ID,
        yield_type,
        common_name,
        scientific_name,
        overview_notes)
      VALUES (
        :plant_id,
        :yield_type,
        :common_name,
        :scientific_name,
        :overview_notes
      )`,
      // these are the data you passed in. 
      [ plant_id,
        yield_type,
        common_name,
        scientific_name,
        overview_notes ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateDemotable(
  plant_id,
  yield_type,
  common_name,
  scientific_name,
  overview_notes
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change to the respective sql query.
      `UPDATE LOCATION SET
                  plant_ID = :plant_id,
                  yield_type = :yield_type,
                  common_name = :common_name,
                  scientific_name = :scientific_name,
                  overview_notes = :overview_notes 
      WHERE plant_ID=:plant_id`,
      [ plant_id,
        yield_type,
        common_name,
        scientific_name,
        overview_notes ],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(plant_id) {
  zone_id = parseInt(zone_id);
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // replace with the query in your table. 
       `DELETE FROM LOCATION 
        WHERE field_name = :field_name 
        AND zone_id = :zone_id`,
      [field_name, zone_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable,
};
