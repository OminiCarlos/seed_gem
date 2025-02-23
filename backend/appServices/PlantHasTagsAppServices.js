const oracledb = require("oracledb");
const { withOracleDB } = require("../appService.js");

// Check database connection
async function checkDbConnection() {
  try {
    return await withOracleDB(async connection => {
      const result = await connection.execute("SELECT 1 FROM DUAL");
      return result.rows.length > 0;
    });
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
}

// Fetch all plant tags from the database
async function fetchPlantTagsFromDb() {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      "SELECT plant_id, tag FROM PLANT_HAS_TAGS"
    );
    return result.rows; // Assuming rows are in a [plant_id, tag] format
  }).catch(error => {
    console.error("Error fetching plant tags:", error);
    return [];
  });
}

// Insert a new tag for a plant
async function insertPlantTag(plant_id, tag) {
  return await withOracleDB(async connection => {
    console.log(plant_id, tag);
    const result = await connection.execute(
      `INSERT INTO PLANT_HAS_TAGS (plant_id, tag) 
       VALUES (:plant_id, :tag)`,
      [plant_id, tag],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error inserting plant tag:", error);
    return false;
  });
}

// Update an existing tag for a plant
async function updatePlantTag(plant_id, oldTag, newTag) {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      `UPDATE PLANT_HAS_TAGS 
       SET tag = :newTag 
       WHERE plant_id = :plant_id AND tag = :oldTag`,
      [newTag, plant_id, oldTag],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error updating plant tag:", error);
    return false;
  });
}

// Delete a tag for a plant
async function deletePlantTag(plant_id, tag) {
  return await withOracleDB(async connection => {
    const result = await connection.execute(
      `DELETE FROM PLANT_HAS_TAGS 
       WHERE plant_id = :plant_id AND tag = :tag`,
      [plant_id, tag],
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(error => {
    console.error("Error deleting plant tag:", error);
    return false;
  });
}

module.exports = {
  checkDbConnection,
  fetchPlantTagsFromDb,
  insertPlantTag,
  updatePlantTag,
  deletePlantTag
};
