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

// Adding new services from here!
async function initiateBatchDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE BATCH`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE BATCH (
                batch_id VARCHAR2(50), 
                care_notes VARCHAR2(255), 
                plant_date DATE, 
                yield_weight NUMBER, 
                planted_quantity NUMBER, 
                survived_quantity NUMBER, 
                item_id VARCHAR2(50), 
                order_id VARCHAR2(50), 
                field_name VARCHAR2(50), 
                zone_id INTEGER,
                PRIMARY KEY (batch_id)
            )`
    );
    console.log("BATCH table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertBatchDemotable(
  batch_id,
  care_notes,
  plant_date,
  yield_weight,
  planted_quantity,
  survived_quantity,
  item_id,
  order_id,
  field_name,
  zone_id
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO BATCH (
                batch_id, care_notes, plant_date, yield_weight, 
                planted_quantity, survived_quantity, item_id, order_id, 
                field_name, zone_id
            ) 
            VALUES (
                :batch_id, :care_notes, TO_DATE(:plant_date, 'YYYY-MM-DD'), :yield_weight, 
                :planted_quantity, :survived_quantity, :item_id, :order_id, 
                :field_name, :zone_id
            )`,
      [
        batch_id,
        care_notes,
        plant_date,
        yield_weight,
        planted_quantity,
        survived_quantity,
        item_id,
        order_id,
        field_name,
        zone_id,
      ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetchBatchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM BATCH");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function updateBatchDemotable(
  batch_id,
  care_notes,
  plant_date,
  yield_weight,
  planted_quantity,
  survived_quantity,
  item_id,
  order_id,
  field_name,
  zone_id
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE BATCH 
            SET 
                care_notes = :care_notes, 
                plant_date = TO_DATE(:plant_date, 'YYYY-MM-DD'), 
                yield_weight = :yield_weight, 
                planted_quantity = :planted_quantity, 
                survived_quantity = :survived_quantity, 
                item_id = :item_id, 
                order_id = :order_id, 
                field_name = :field_name, 
                zone_id = :zone_id
            WHERE batch_id = :batch_id`,
      [
        care_notes,
        plant_date,
        yield_weight,
        planted_quantity,
        survived_quantity,
        item_id,
        order_id,
        field_name,
        zone_id,
        batch_id,
      ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteBatchDemotable(batch_id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `
            DELETE FROM BATCH 
            WHERE batch_id = :batch_id`,
      [batch_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  fetchDemotableFromDb,
  initiateBatchDemotable,
  insertBatchDemotable,
  fetchBatchDemotableFromDb,
  updateBatchDemotable,
  deleteBatchDemotable,
};
