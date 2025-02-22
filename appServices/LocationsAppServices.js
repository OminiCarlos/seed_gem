const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://hcwkiyqibkgkluouhkib.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd2tpeXFpYmtna2x1b3Voa2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNDExODYsImV4cCI6MjA0MjgxNzE4Nn0.DZXk4MZ-x6myPy5XW0N6FRu06T6z53r1asvXlpdRLio"
);

// above should be unchanged

// adding new services from here!
async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      // change the table name to drop.
      await connection.execute(`DROP TABLE LOCATION`);
    } catch (err) {
      // put the respective table name to help debugging.
      console.log("Location Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(
      // change the table name and field. The order of field names follows that in seed_gem.sql
      `
      CREATE TABLE LOCATION (
                field_name VARCHAR2(50), 
                zone_id INTEGER, 
                is_outdoor NUMBER(1), 
                PRIMARY KEY (field_name, zone_id)
            )
        `
    );
    // change this to your table name
    console.log("LOCATION table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

//
async function insertDemotable(
  // change these to the attributes in your table.
  field_name,
  zone_id,
  is_outdoor,
  is_irrigated
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change the attributes and the variable names.
      `INSERT INTO LOCATION (field_name, zone_id, is_outdoor) 
                        VALUES (:field_name, :zone_id, :is_outdoor)`,
      // these are the data you passed in.
      [field_name, zone_id, is_outdoor],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  try {
    const { data, error } = await supabase.from("location").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function updateDemotable(field_name, zone_id, is_outdoor) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // change to the respective sql query.
      `UPDATE LOCATION SET is_outdoor = :is_outdoor 
                WHERE field_name=:field_name
                AND   zone_id = :zone_id  `,
      [is_outdoor, field_name, zone_id],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(field_name, zone_id) {
  zone_id = parseInt(zone_id);
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      // replace with the query in your table.
      `DELETE FROM LOCATION 
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

async function filterDemotable(showOutdoor, showIndoor) {
  return await withOracleDB(async (connection) => {
    // Build the WHERE clause dynamically based on input
    console.log(showOutdoor, showIndoor);
    const conditions = [];
    if (showOutdoor == 1) {
      conditions.push("location.is_outdoor = 1");
    }
    if (showIndoor == 1) {
      conditions.push("location.is_outdoor = 0");
    }
    console.log(conditions.length, conditions);
    const whereClause =
      conditions.length === 2
        ? `WHERE LOCATION.is_outdoor = Location_irrigation.is_outdoor 
                                              AND (${conditions.join(" OR ")}) `
        : conditions.length === 1
          ? `WHERE LOCATION.is_outdoor = Location_irrigation.is_outdoor AND ${conditions.join()} `
          : `WHERE LOCATION.is_outdoor = Location_irrigation.is_outdoor`;

    const query = `
      SELECT LOCATION.field_name, LOCATION.zone_id, LOCATION.is_outdoor, Location_irrigation.is_irrigated
      FROM LOCATION, Location_irrigation 
      
      ${whereClause}
    `;

    const result = await connection.execute(query);
    return result.rows;
  }).catch((error) => {
    console.error("Error filtering demotable:", error);
    return [];
  });
}

module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable,
  filterDemotable,
  filterDemotable,
};
