const { withSupabase } = require("../appService.js");

// Fetch all stages from the database
async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("Stage")
      .select("plant_id, stage_name, Plant:plant_id (common_name)");
    if (error) {
      console.error("Error fetching stages:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching stages:", err);
    return [];
  });
}

// Table creation/reset should be managed in Supabase dashboard.
async function initiateDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

async function insertDemotable(plant_id, stage_name) {
  return await withSupabase(async (supabase) => {
    // Optionally, check if the Plant exists (can be done client-side or via Supabase RPC)
    const { error } = await supabase
      .from("Stage")
      .insert([{ stage_name, plant_id }]);
    if (error) {
      console.error("Error inserting stage:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting stage:", err);
    return false;
  });
}

// Update an existing stage
async function updateDemotable(stage_name, plant_id, new_stage_name) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Stage")
      .update({ stage_name: new_stage_name })
      .eq("stage_name", stage_name)
      .eq("plant_id", plant_id);
    if (error) {
      console.error("Error updating stage:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating stage:", err);
    return false;
  });
}

// Delete a stage
async function deleteDemotable(plant_id, stage_name) {
  console.log(`${plant_id}, ${stage_name}`);
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Stage")
      .delete()
      .eq("stage_name", stage_name)
      .eq("plant_id", plant_id);
    if (error) {
      console.error("Error deleting stage:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting stage:", err);
    return false;
  });
}

module.exports = {
  fetchDemotableFromDb,
  initiateDemotable,
  insertDemotable,
  updateDemotable,
  deleteDemotable,
};
