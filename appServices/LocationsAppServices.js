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

async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE DEMOTABLE`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    // we can pass a command to read a sql to execute a series of sql tables.
    // I think it makes sense to intialize the entire ER diagram first, given some tables are dependent
    // on other tables (foreign keys and total participations.)
    // Therefore it's important to consider the order of intializing tables.
    // moreover, the error messages are not very clear (we only know it failed but we don't know why.)
    const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            );
            CREATE TABLE Location_irrigation (
                is_outdoor BOOLEAN PRIMARY KEY,
                is_irrigated BOOLEAN
            );
        `);
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertDemotable(id, name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
      [id, name],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateNameDemotable(oldName, newName) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
      [newName, oldName],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM DEMOTABLE");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

// above should not be changed
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
  initiateDemotable,
  insertDemotable,
  updateNameDemotable,
  countDemotable,
  initiateLocationDemotable,
  insertLocationDemotable,
  fetchLocationDemotableFromDb,
  updateLocationDemotable,
  deleteLocationDemotable,
};
