const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM DEMOTABLE");
    return result.rows;
  }).catch(() => {
    return [];
  });
}
// above should be unchanged

// adding new services from here!
async function initiateLocationDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE LOCATION`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE LOCATION (
                field_name VARCHAR2(50), 
                zone_id INTEGER, 
                is_outdoor NUMBER(1), 
                PRIMARY KEY (field_name, zone_id)
            )
        `
    );
    console.log("LOCATION table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertLocationDemotable(
  field_name,
  zone_id,
  is_outdoor,
  is_irrigated
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO LOCATION (field_name, zone_id, is_outdoor) 
                        VALUES (:field_name, :zone_id, :is_outdoor)`,
      [field_name, zone_id, is_outdoor],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetchLocationDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Location"); // replace with a join sql statement
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function updateLocationDemotable(field_name, zone_id, is_outdoor) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE LOCATION SET is_outdoor = :is_outdoor 
                WHERE field_name=:field_name
                AND   zone_id = :zone_id  `,
      [is_outdoor, field_name, zone_id],
      { autoCommit: true }
    );
    // console.log(result.rowsAffected);
    // console.log(result.rowsAffected && result.rowsAffected > 0);

    // return result.rowsAffected && result.rowsAffected > 0;
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteLocationDemotable(field_name, zone_id) {
  zone_id = parseInt(zone_id);
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `
            DELETE FROM LOCATION 
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
  fetchDemotableFromDb,
  initiateLocationDemotable,
  insertLocationDemotable,
  fetchLocationDemotableFromDb,
  updateLocationDemotable,
  deleteLocationDemotable,
};
