const { withSupabase } = require("../appService.js");

// Add new services below
// Table creation/reset should be managed in Supabase dashboard.
async function resetSoilConditionsTable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

async function insertSoilCondition(soil_type, ph, organic_matter) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("Soil_condition").insert([
      {
        soil_type,
        pH: ph,
        organic_matter_concentration: organic_matter,
      },
    ]);
    if (error) {
      console.error("Error inserting soil condition:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting soil condition:", err);
    return false;
  });
}

async function fetchSoilConditionsFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("Soil_condition")
      .select("soil_type, pH, organic_matter_concentration");
    if (error) {
      console.error("Error fetching soil conditions:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching soil conditions:", err);
    return [];
  });
}

async function updateSoilCondition(soil_type, ph, organic_matter) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Soil_condition")
      .update({ pH: ph, organic_matter_concentration: organic_matter })
      .eq("soil_type", soil_type);
    if (error) {
      console.error("Error updating soil condition:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating soil condition:", err);
    return false;
  });
}

async function deleteSoilCondition(soil_type) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Soil_condition")
      .delete()
      .eq("soil_type", soil_type);
    if (error) {
      console.error("Error deleting soil condition:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting soil condition:", err);
    return false;
  });
}

// async function countSoilConditions() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(`
//       SELECT COUNT(*) AS COUNT
//       FROM SOIL_CONDITIONS
//     `);

//     return result.rows[0]?.COUNT || 0;
//   }).catch(() => {
//     return null;
//   });
// }

async function filterSoilConditions(filters) {
  return await withSupabase(async (supabase) => {
    let query = supabase
      .from("Soil_condition")
      .select("soil_type, pH, organic_matter_concentration");
    if (filters && typeof filters === "object") {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) {
      console.error("Error filtering soil conditions:", error);
      throw error;
    }
    return data || [];
  });
}

module.exports = {
  resetSoilConditionsTable,
  insertSoilCondition,
  fetchSoilConditionsFromDb,
  updateSoilCondition,
  deleteSoilCondition,
  filterSoilConditions,
  // countSoilConditions,
};
