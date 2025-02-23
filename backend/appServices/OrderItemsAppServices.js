const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Create the ORDER_ITEM table
async function initiateDemotable() {
  return await withOracleDB(async connection => {
    try {
      await connection.execute(`DROP TABLE ORDER_ITEM`);
    } catch (err) {
      console.log("ORDER_ITEM table might not exist, proceeding to create...");
    }

    const result = await connection.execute(`
      CREATE TABLE ORDER_ITEM (
        order_ID INTEGER,
        item_ID INTEGER,
        plant_ID INTEGER,
        quantity INTEGER,
        unit VARCHAR(50),
        item_price NUMBER(10, 2),
        supplier_ID INTEGER,
        item_comment VARCHAR(3000),
        PRIMARY KEY (order_ID, item_ID)
      )
    `);
    console.log("ORDER_ITEM table created successfully!");
    return true;
  }).catch(error => {
    console.error("Error creating ORDER_ITEM table:", error);
    return false;
  });
}

// Insert a new order item
async function insertDemotable(
  order_ID,
  item_ID,
  plant_ID,
  quantity,
  unit,
  item_price,
  supplier_ID,
  item_comment
) {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      `INSERT INTO ORDER_ITEM (order_ID, item_ID, plant_ID, quantity, unit, item_price, supplier_ID, item_comment)
       VALUES (:order_ID, :item_ID, :plant_ID, :quantity, :unit, :item_price, :supplier_ID, :item_comment)`,
      [
        order_ID,
        item_ID,
        plant_ID,
        quantity,
        unit,
        item_price,
        supplier_ID,
        item_comment
      ],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error inserting order item:", error);
    return false;
  });
}

// Fetch all order items
async function fetchDemotableFromDb() {
  return await withOracleDB(async connection => {
    const result = await connection.execute(`
      SELECT * 
      FROM ORDER_ITEM
    `);
    return result.rows;
  }).catch(error => {
    console.error("Error fetching order items:", error);
    return [];
  });
}

// Update an existing order item
async function updateDemotable(
  order_ID,
  item_ID,
  plant_ID,
  quantity,
  unit,
  item_price,
  supplier_ID,
  item_comment
) {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      `UPDATE ORDER_ITEM
       SET plant_ID = :plant_ID,
           quantity = :quantity,
           unit = :unit,
           item_price = :item_price,
           supplier_ID = :supplier_ID,
           item_comment = :item_comment
       WHERE order_ID = :order_ID AND item_ID = :item_ID`,
      {
        order_ID,
        item_ID,
        plant_ID,
        quantity,
        unit,
        item_price,
        supplier_ID,
        item_comment
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error updating order item:", error);
    return false;
  });
}

// Delete an order item
async function deleteDemotable(order_ID, item_ID) {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      `DELETE FROM ORDER_ITEM 
       WHERE order_ID = :order_ID AND item_ID = :item_ID`,
      { order_ID, item_ID },
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error deleting order item:", error);
    return false;
  });
}

// Export the services
module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable
};
