const { withSupabase } = require("../appService.js");

// Table creation/reset should be managed in Supabase dashboard.
async function resetDistinguishedByTable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

// Fetch all entries from the table
async function fetchDistinguishedByFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("distinguished_by")
      .select(
        `field_name, zone_id, soil_type, Location:field_name (is_outdoor), Soil_condition:soil_type (pH, organic_matter_concentration)`
      );
    if (error) {
      console.error("Error fetching distinguished_by:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching distinguished_by:", err);
    return [];
  });
}

// Insert a new entry into the table
async function insertDistinguishedBy(field_name, zone_id, soil_type) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("distinguished_by")
      .insert([{ field_name, zone_id, soil_type }]);
    if (error) {
      console.error("Error inserting distinguished_by:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting distinguished_by:", err);
    return false;
  });
}

// Update an existing entry in the table
async function updateDistinguishedBy(
  field_name,
  zone_id,
  old_soil_type,
  new_soil_type
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("distinguished_by")
      .update({ soil_type: new_soil_type })
      .eq("field_name", field_name)
      .eq("zone_id", zone_id)
      .eq("soil_type", old_soil_type);
    if (error) {
      console.error("Error updating distinguished_by:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating distinguished_by:", err);
    return false;
  });
}

// Delete an entry from the table
async function deleteDistinguishedBy(field_name, zone_id, soil_type) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("distinguished_by")
      .delete()
      .eq("field_name", field_name)
      .eq("zone_id", zone_id)
      .eq("soil_type", soil_type);
    if (error) {
      console.error("Error deleting distinguished_by:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting distinguished_by:", err);
    return false;
  });
}

// Fetch good locations (custom logic, may need to be implemented in Supabase RPC or client-side)
async function fetchGoodLocations() {
  console.warn(
    "Complex queries should be implemented using Supabase RPC or client-side logic."
  );
  return [];
}

// Fetch super fields (custom logic, may need to be implemented in Supabase RPC or client-side)
async function fetchSuperFields() {
  console.warn(
    "Complex queries should be implemented using Supabase RPC or client-side logic."
  );
  return [];
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
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("distinguished_by")
      .select(
        `field_name, zone_id, soil_type, Location:field_name (is_outdoor, zone_id), Soil_condition:soil_type (pH, organic_matter_concentration)`
      )
      .eq("field_name", field_name);
    if (error) {
      console.error("Error fetching information by Field Name:", error);
      throw error;
    }
    return data || [];
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
  // countDistinguishedBy,
};
