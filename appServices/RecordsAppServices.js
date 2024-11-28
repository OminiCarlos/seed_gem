const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

async function fetchEventRecordsFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM EVENT_RECORDS");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function initiateEventRecords() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE EVENT_RECORDS`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE EVENT_RECORDS (
                event_id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
                event_title VARCHAR2(255),
                event_date DATE,
                event_instruction VARCHAR2(255),
                event_observation VARCHAR2(255),
                batch_ID NUMBER,
                user_ID NUMBER,
                PRIMARY KEY (event_id)
            )`
    );
    console.log("EVENT_RECORDS table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertEventRecord(
  event_title,
  event_date,
  event_instruction,
  event_observation,
  batch_ID,
  user_ID
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO EVENT_RECORDS (
                event_title, event_date, event_instruction, 
                event_observation, batch_ID, user_ID
            ) 
            VALUES (
                :event_title, TO_DATE(:event_date, 'YYYY-MM-DD'), 
                :event_instruction, :event_observation, 
                :batch_ID, :user_ID
            )`,
      [
        event_title,
        event_date,
        event_instruction,
        event_observation,
        batch_ID,
        user_ID,
      ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateEventRecord(
  event_id,
  event_title,
  event_date,
  event_instruction,
  event_observation,
  batch_ID,
  user_ID
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE EVENT_RECORDS 
            SET 
                event_title = :event_title,
                event_date = TO_DATE(:event_date, 'YYYY-MM-DD'),
                event_instruction = :event_instruction,
                event_observation = :event_observation,
                batch_ID = :batch_ID,
                user_ID = :user_ID
            WHERE event_id = :event_id`,
      [
        event_title,
        event_date,
        event_instruction,
        event_observation,
        batch_ID,
        user_ID,
        event_id,
      ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteEventRecord(event_id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM EVENT_RECORDS 
            WHERE event_id = :event_id`,
      [event_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

module.exports = {
  fetchEventRecordsFromDb,
  initiateEventRecords,
  insertEventRecord,
  updateEventRecord,
  deleteEventRecord,
};