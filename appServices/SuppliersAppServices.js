const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

async function fetchSupplierDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM SUPPLIER");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function initiateSupplierDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE SUPPLIER`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      `CREATE TABLE SUPPLIER (
                supplier_id VARCHAR2(50), 
                supplier_name VARCHAR2(255), 
                supplier_address VARCHAR2(255), 
                supplier_tel VARCHAR2(15),
                PRIMARY KEY (supplier_id)
            )`
    );
    console.log("SUPPLIER table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertSupplierDemotable(
  supplier_id,
  supplier_name,
  supplier_address,
  supplier_tel
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO SUPPLIER (
                supplier_id, supplier_name, supplier_address, supplier_tel
            ) 
            VALUES (
                :supplier_id, :supplier_name, :supplier_address, :supplier_tel
            )`,
      [supplier_id, supplier_name, supplier_address, supplier_tel],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateSupplierDemotable(
  supplier_id,
  supplier_name,
  supplier_address,
  supplier_tel
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE SUPPLIER 
            SET 
                supplier_name = :supplier_name, 
                supplier_address = :supplier_address, 
                supplier_tel = :supplier_tel
            WHERE supplier_id = :supplier_id`,
      [supplier_name, supplier_address, supplier_tel, supplier_id],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteSupplierDemotable(supplier_id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `
            DELETE FROM SUPPLIER 
            WHERE supplier_id = :supplier_id`,
      [supplier_id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  fetchSupplierDemotableFromDb,
  initiateSupplierDemotable,
  insertSupplierDemotable,
  updateSupplierDemotable,
  deleteSupplierDemotable,
};
