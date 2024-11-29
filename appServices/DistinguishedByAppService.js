const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Reset or initialize the table
async function resetDistinguishedByTable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE LOCATION_DISTINGUISHED_BY_SOIL`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    await connection.execute(
      `CREATE TABLE LOCATION_DISTINGUISHED_BY_SOIL (
         field_name VARCHAR2(50), 
         zone_id INTEGER, 
         soil_type VARCHAR2(50), 
         PRIMARY KEY (field_name, zone_id)
       )`
    );

    console.log("LOCATION_DISTINGUISHED_BY_SOIL table created successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// Fetch all entries from the table
async function fetchDistinguishedByFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
      SELECT 
    Location.field_name,
    Location.zone_id,
    Location.is_outdoor,
    Soil_condition.soil_type,
    Soil_condition.pH,
    Soil_condition.organic_matter_concentration
FROM 
    distinguished_by
JOIN 
    Location 
ON 
    distinguished_by.field_name = Location.field_name
    AND distinguished_by.zone_id = Location.zone_id
JOIN 
    Soil_condition 
ON 
    distinguished_by.soil_type = Soil_condition.soil_type
 
    `);

    return result.rows;
  }).catch(() => {
    return [];
  });
}

// Insert a new entry into the table
async function insertDistinguishedBy(field_name, zone_id, soil_type) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO distinguished_by (field_name, zone_id, soil_type) 
       VALUES (:field_name, :zone_id, :soil_type)`,
      [field_name, zone_id, soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Update an existing entry in the table
async function updateDistinguishedBy(field_name, zone_id, old_soil_type, new_soil_type) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE distinguished_by
       SET soil_type = :new_soil_type
       WHERE field_name = :field_name
         AND zone_id = :zone_id
         AND soil_type = :old_soil_type`,
      [new_soil_type, field_name, zone_id, old_soil_type],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

// Delete an entry from the table
async function deleteDistinguishedBy(field_name, zone_id, soil_type) {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute(
        `DELETE FROM LOCATION_DISTINGUISHED_BY_SOIL 
         WHERE field_name = :field_name 
           AND zone_id = :zone_id
           AND soil_type = :soil_type`,
        [field_name, zone_id, soil_type],
        { autoCommit: true }
      );
  
      return result.rowsAffected > 0;
    }).catch(() => {
      return false;
    });
  }


  async function fetchGoodLocations() {
    return await withOracleDB(async (connection) => {
      const query = `
        SELECT 
    Location.field_name, 
    location.zone_ID, 
    location.is_outdoor,
    distinguished_by.soil_type,
    Soil_condition.pH,
    Soil_condition.organic_matter_concentration 
FROM 
    distinguished_by, Location, Soil_condition
WHERE 
    distinguished_by.field_name = Location.field_name
    AND 
    distinguished_by.zone_id = Location.zone_id
    AND 
    distinguished_by.soil_type = Soil_condition.soil_type
    AND
    Soil_condition.organic_matter_concentration >= ALL (
        SELECT 
            AVG(Soil_condition.organic_matter_concentration)
        FROM 
            distinguished_by
        JOIN 
            Location 
        ON 
            distinguished_by.field_name = Location.field_name
            AND distinguished_by.zone_id = Location.zone_id
        JOIN 
            Soil_condition 
        ON 
            distinguished_by.soil_type = Soil_condition.soil_type
        GROUP BY 
            Location.field_name
    )

      `;
      const result = await connection.execute(query);
      return result.rows;
    });
  }


  async function fetchSuperFields() {
    return await withOracleDB(async (connection) => {
      const query = `
       SELECT DISTINCT d.field_name 
FROM distinguished_by d
WHERE NOT EXISTS (
    SELECT s.soil_type
    FROM Soil_condition s
    WHERE NOT EXISTS (
        SELECT 1
        FROM distinguished_by d2
        WHERE d2.field_name = d.field_name
          AND d2.soil_type = s.soil_type
    )
)
      `;
      const result = await connection.execute(query);

      return result.rows;
    }).catch((error) => {
      console.error("Error fetching super fields:", error);
      throw error;
    });
  }
  

  

// Count the total number of entries in the table
// async function countDistinguishedBy() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`
//       SELECT COUNT(*) AS COUNT
//       FROM LOCATION_DISTINGUISHED_BY_SOIL
//     `);

//     return result.rows[0]?.COUNT || 0;
//   }).catch(() => {
//     return null;
//   });
// }


// Fetch information by Field Name
async function fetchFieldName(field_name) {
  return await withOracleDB(async (connection) => {
    const query = `
      SELECT 
        Location.field_name,
        Location.zone_id,
        Location.is_outdoor,
        Soil_condition.soil_type,
        Soil_condition.pH,
        Soil_condition.organic_matter_concentration
      FROM 
        distinguished_by
      JOIN 
        Location 
      ON 
        distinguished_by.field_name = Location.field_name
        AND distinguished_by.zone_id = Location.zone_id
      JOIN 
        Soil_condition 
      ON 
        distinguished_by.soil_type = Soil_condition.soil_type
      WHERE 
        Location.field_name = :field_name
    `;

    const result = await connection.execute(query, [field_name]);

    return result.rows; // Return the retrieved rows
  }).catch((error) => {
    console.error("Error fetching information by Field Name:", error);
    throw error; // Rethrow the error to be handled by the controller
  });
}


module.exports = {
  resetDistinguishedByTable,
  fetchDistinguishedByFromDb,
  insertDistinguishedBy,
  updateDistinguishedBy,
  deleteDistinguishedBy,
  fetchGoodLocations,
  fetchSuperFields,
  fetchFieldName,
//   countDistinguishedBy,
};
