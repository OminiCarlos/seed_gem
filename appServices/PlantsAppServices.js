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
      await connection.execute(`DROP TABLE PLANT`);
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
      )
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
      [plant_id, yield_type, common_name, scientific_name, overview_notes],
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
      // change to the respective sql query. Change the table name as well.
      `UPDATE PLANT SET
                  plant_ID = :plant_id,
                  yield_type = :yield_type,
                  common_name = :common_name,
                  scientific_name = :scientific_name,
                  overview_notes = :overview_notes 
      WHERE plant_ID=:plant_id`,
      [plant_id, yield_type, common_name, scientific_name, overview_notes],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(plant_id) {
  zone_id = parseInt(plant_id);
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // replace with the query in your table.
      `DELETE FROM PLANT 
        WHERE plant_ID = :plant_id`,
      [plant_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM PLANT");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function countFruitYieldingPlants() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT COUNT(*) AS fruit_count
       FROM Plant
       GROUP BY yield_type
       HAVING LOWER(yield_type) = 'fruit'`
    );
    console.log(result);
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function getYieldTypeCounts() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `
      SELECT yield_type, COUNT(*) AS count
      FROM Plant
      GROUP BY yield_type
      ORDER BY yield_type
      `
    );
    return result.rows.map((row) => ({
      yield_type: row[0],
      count: row[1],
    }));
  }).catch((error) => {
    console.error("Error fetching yield type counts:", error);
    return [];
  });
}




module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable,
  countDemotable,
  countFruitYieldingPlants: countFruitYieldingPlants,
  getYieldTypeCounts,getYieldTypeCounts
};
