const { withSupabase } = require("../appService.js");

// Initialize the Cultivar table
async function initiateCultivarTable() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("cultivar")
      .delete()
      .neq("plant_id", 0);

    if (error) {
      console.error("Error clearing Cultivar table:", error);
      return false;
    }

    console.log("CULTIVAR table cleared successfully!");
    return true;
  }).catch((err) => {
    console.error("Error initiating Cultivar table:", err);
    return false;
  });
}

// Insert a new record into the Cultivar table
async function insertCultivar(plant_ID, cultivar_name) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("cultivar").insert({
      plant_id: plant_ID,
      cultivar_name: cultivar_name,
    });

    if (error) {
      console.error("Error inserting cultivar:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting cultivar:", err);
    return false;
  });
}

// Fetch all records from the Cultivar table
async function fetchCultivarsFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("cultivar").select(`
        plant_id,
        cultivar_name,
        plant:plant_id (
          yield_type,
          common_name,
          scientific_name,
          overview_notes
        )
      `);

    if (error) {
      console.error("Error fetching cultivars:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching cultivars:", err);
    return [];
  });
}

// Update a record in the Cultivar table
async function updateCultivar(plant_ID, cultivar_name) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("cultivar")
      .update({ cultivar_name: cultivar_name })
      .eq("plant_id", plant_ID);

    if (error) {
      console.error("Error updating cultivar:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating cultivar:", err);
    return false;
  });
}

// Delete a record from the Cultivar table
async function deleteCultivar(plant_ID) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("cultivar")
      .delete()
      .eq("plant_id", plant_ID);

    if (error) {
      console.error("Error deleting cultivar:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting cultivar:", err);
    return false;
  });
}

// Count the total number of records in the Cultivar table
// async function countCultivars() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`SELECT COUNT(*) AS count FROM CULTIVAR`);
//     return result.rows[0]?.COUNT || 0;
//   }).catch((err) => {
//     console.error("Error counting cultivars:", err);
//     return null;
//   });
// }

module.exports = {
  initiateCultivarTable,
  insertCultivar,
  fetchCultivarsFromDb,
  updateCultivar,
  deleteCultivar,
  //   countCultivars,
};
