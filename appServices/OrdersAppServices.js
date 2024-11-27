const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// above should be unchanged

// adding new services from here!
async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      // change the table name to drop.
      await connection.execute(`DROP TABLE ORDERS`);
    } catch (err) {
      // put the respective table name to help debugging.
      console.log("Orders Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      // change the table name and field. The order of field names follows that in seed_gem.sql
      `
      CREATE TABLE ORDERS (
       order_id INTEGER PRIMARY KEY,
       order_date DATE,
       order_comment VARCHAR(3000)
      )   
        `
    );
    // change this to your table name
    console.log("Orders table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// 
async function insertDemotable(
  // change these to the attributes in your table.
  order_id,
  order_date,
  order_comment
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change the attributes and the variable names.
      `INSERT INTO ORDERS (order_id, order_date, order_comment) 
                        VALUES (:order_id, TO_DATE(:order_date, 'YYYY-MM-DD'), :order_comment)`,
      // these are the data you passed in. 
      [order_id, order_date, order_comment],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}


async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
      SELECT *
      FROM ORDERS
      `); // replace with a join sql statement
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function updateDemotable(order_id, order_date, order_comment) {
  console.log("service update orders called.");
  console.log({ order_id, order_date, order_comment });
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change to the respective sql query.
      `UPDATE ORDERS
      SET
          order_date = TO_DATE(:order_date, 'YYYY-MM-DD'),
          order_comment = :order_comment
      WHERE   order_id = :order_id`,
      { order_id, order_date, order_comment},
      { autoCommit: true }
      
    );
    console.log(`order update rows affected:${result.rowsAffected}`);
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(order_id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // replace with the query in your table. 
       `DELETE FROM ORDERS 
        WHERE order_id = :order_id`,
      {order_id},
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
