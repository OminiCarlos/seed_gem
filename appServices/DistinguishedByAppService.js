const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Reset or initialize the table
async function resetDistinguishedByTable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE LOCATION_DISTINGUISHED_BY_SOIL`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    await connection.execute(
      `CREATE TABLE LOCATION_DISTINGUISHED_BY_SOIL (
         field_name VARCHAR2(50), 
         zone_id INTEGER, 
         soil_type VARCHAR2(50), 
         PRIMARY KEY (field_name, zone_id)
       )`
    );

    console.log("LOCATION_DISTINGUISHED_BY_SOIL table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// Fetch all entries from the table
async function fetchDistinguishedByFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
      SELECT field_name, zone_id, soil_type
      FROM distinguished_by
    `);

    return result.rows;
  }).catch(() => {
    return [];
  });
}

// Insert a new entry into the table
async function insertDistinguishedBy(field_name, zone_id, soil_type) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO distinguished_by (field_name, zone_id, soil_type) 
       VALUES (:field_name, :zone_id, :soil_type)`,
      [field_name, zone_id, soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Update an existing entry in the table
async function updateDistinguishedBy(field_name, zone_id, old_soil_type, new_soil_type) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE distinguished_by
       SET soil_type = :new_soil_type
       WHERE field_name = :field_name
         AND zone_id = :zone_id
         AND soil_type = :old_soil_type`,
      [new_soil_type, field_name, zone_id, old_soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Delete an entry from the table
async function deleteDistinguishedBy(field_name, zone_id, soil_type) {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute(
        `DELETE FROM LOCATION_DISTINGUISHED_BY_SOIL 
         WHERE field_name = :field_name 
           AND zone_id = :zone_id
           AND soil_type = :soil_type`,
        [field_name, zone_id, soil_type],
        { autoCommit: true }
      );
  
      return result.rowsAffected > 0;
    }).catch(() => {
      return false;
    });
  }

// Count the total number of entries in the table
// async function countDistinguishedBy() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`
//       SELECT COUNT(*) AS COUNT
//       FROM LOCATION_DISTINGUISHED_BY_SOIL
//     `);

//     return result.rows[0]?.COUNT || 0;
//   }).catch(() => {
//     return null;
//   });
// }

module.exports = {
  resetDistinguishedByTable,
  fetchDistinguishedByFromDb,
  insertDistinguishedBy,
  updateDistinguishedBy,
  deleteDistinguishedBy,
//   countDistinguishedBy,
};
