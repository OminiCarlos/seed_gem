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

async function updateDisplayDemotable(order_id, order_date, order_comment) {
  return await withOracleDB(async connection => {
    // Step 1: Whitelist and validate column names
    const validColumns = {
      order_id: "order_id",
      order_date: "order_date",
      order_comment: "order_comment"
    };
    
    const selectedColumns = [];
    if (order_id) selectedColumns.push(validColumns.order_id);
    if (order_date) selectedColumns.push(validColumns.order_date);
    if (order_comment) selectedColumns.push(validColumns.order_comment);

    // Step 2: Join columns into a comma-separated string
    const selection = selectedColumns.join(",");
    // Step 3: Handle no columns selected case
    if (!selection) {
      throw new Error("No columns selected for the query");
    }

    const query = `SELECT ${selection} FROM Orders`;
    console.log("Executing Query:", query);

    // Step 4: Execute the query
    const result = await connection.execute(
      query,
      {},
      { autoCommit: true }
    );
    console.log(result.rows[0][0]);
    return result.rows;
  }).catch(err => {
    console.error("Error executing query:", err);
    return false;
  });
}

module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable,
  updateDisplayDemotable: updateDisplayDemotable,
};
