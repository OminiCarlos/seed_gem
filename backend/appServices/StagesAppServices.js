const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Fetch all stages from the database
async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT s.plant_id, p.common_name, s.stage_name
       FROM Stage s, Plant p
       Where s.plant_id = p.plant_ID` // Simple query to fetch all rows from the Stage table
    );
    return result.rows;
  }).catch((err) => {
    console.error("Error fetching stages:", err);
    return [];
  });
}

async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      // Check if the table exists before attempting to drop it
      const tableCheck = await connection.execute(
        `SELECT table_name 
         FROM user_tables 
         WHERE table_name = 'STAGE'`
      );

      if (tableCheck.rows.length > 0) {
        console.log("Dropping existing Stage table...");
        await connection.execute(`DROP TABLE Stage CASCADE CONSTRAINTS`);
      } else {
        console.log("Stage table does not exist. Proceeding to create...");
      }

      // Create the Stage table
      await connection.execute(`
        CREATE TABLE Stage (
          stage_name VARCHAR(50),
          plant_ID INTEGER,
          PRIMARY KEY (stage_name, plant_ID),
          FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID) ON DELETE CASCADE
        )
      `);
      console.log("Stage table created successfully!");
      return true;
    } catch (err) {
      console.error("Error during table initialization:", err);
      return false;
    }
  }).catch((err) => {
    console.error("Error with database connection:", err);
    return false;
  });
}


async function insertDemotable(plant_id, stage_name) {
  return await withOracleDB(async (connection) => {
    // Check if the Plant exists
    const plantCheck = await connection.execute(
      `SELECT 1 FROM Plant WHERE plant_ID = :plant_id`,
      { plant_id }
    );

    if (plantCheck.rows.length === 0) {
      console.error(`Plant with plant_ID ${plant_id} does not exist.`);
      return false;
    }

    // Insert Stage
    const result = await connection.execute(
      `INSERT INTO Stage (
          stage_name, 
          plant_ID
      ) VALUES (
          :stage_name, 
          :plant_id
      )`,
      { stage_name, plant_id },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error inserting stage:", err);
    return false;
  });
}

// Update an existing stage
async function updateDemotable(stage_name, plant_id, new_stage_name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE Stage
       SET
          stage_name = :new_stage_name
       WHERE 
          stage_name = :stage_name AND 
          plant_ID = :plant_id`,
      { stage_name, plant_id, new_stage_name },
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error updating stage:", err);
    return false;
  });
}

// Delete a stage
async function deleteDemotable(plant_id, stage_name) {
  console.log(`${ plant_id }, ${ stage_name }`);
  return await withOracleDB(async (connection) => {
    console.log("got to delete demotable");
    const result = await connection.execute(
      `DELETE FROM Stage 
       WHERE stage_name = :stage_name AND plant_id = :plant_id`,
      { stage_name, plant_id },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch((err) => {
    console.error("Error deleting stage:", err);
    return false;
  });
}

module.exports = {
  fetchDemotableFromDb,
  initiateDemotable,
  insertDemotable,
  updateDemotable,
  deleteDemotable,
};
