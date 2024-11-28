const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Fetch all records from the batch_is_at_stage table
async function fetchBatchStagesFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM BATCH_IS_AT_STAGE");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

// Initialize the batch_is_at_stage table
async function initiateBatchStages() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE BATCH_IS_AT_STAGE`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE BATCH_IS_AT_STAGE (
          batch_ID VARCHAR2(50), 
          plant_ID INTEGER, 
          stage_name VARCHAR(50), 
          start_date DATE, 
          end_date DATE,
          PRIMARY KEY (batch_ID, plant_ID, stage_name),
          FOREIGN KEY (batch_ID) REFERENCES BATCH(batch_id),
          FOREIGN KEY (plant_ID, stage_name) REFERENCES STAGE(plant_ID, stage_name)
      )`
    );
    console.log("BATCH_IS_AT_STAGE table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// Insert a new record into the batch_is_at_stage table
async function insertBatchStage(
  batch_ID,
  plant_ID,
  stage_name,
  start_date,
  end_date
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO BATCH_IS_AT_STAGE (
          batch_ID, plant_ID, stage_name, start_date, end_date
      ) 
      VALUES (
          :batch_ID, :plant_ID, :stage_name, TO_DATE(:start_date, 'YYYY-MM-DD'), TO_DATE(:end_date, 'YYYY-MM-DD')
      )`,
      [batch_ID, plant_ID, stage_name, start_date, end_date],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Update an existing record in the batch_is_at_stage table
async function updateBatchStage(
  batch_ID,
  plant_ID,
  stage_name,
  start_date,
  end_date
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE BATCH_IS_AT_STAGE 
      SET 
          start_date = TO_DATE(:start_date, 'YYYY-MM-DD'), 
          end_date = TO_DATE(:end_date, 'YYYY-MM-DD')
      WHERE 
          batch_ID = :batch_ID AND 
          plant_ID = :plant_ID AND 
          stage_name = :stage_name`,
      [start_date, end_date, batch_ID, plant_ID, stage_name],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Delete a record from the batch_is_at_stage table
async function deleteBatchStage(batch_ID, plant_ID, stage_name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM BATCH_IS_AT_STAGE 
      WHERE 
          batch_ID = :batch_ID AND 
          plant_ID = :plant_ID AND 
          stage_name = :stage_name`,
      [batch_ID, plant_ID, stage_name],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  fetchBatchStagesFromDb,
  initiateBatchStages,
  insertBatchStage,
  updateBatchStage,
  deleteBatchStage,
};
