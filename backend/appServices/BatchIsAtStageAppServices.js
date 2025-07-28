const { withSupabase } = require("../appService.js");

// Fetch all records from the batch_is_at_stage table
async function fetchBatchStagesFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("batch_is_at_stage")
      .select("*");

    if (error) {
      console.error("Error fetching batch stages:", error);
      return [];
    }
    return data || [];
  }).catch(() => {
    return [];
  });
}

// Clear all records from the batch_is_at_stage table (for testing/reset purposes)
async function initiateBatchStages() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("batch_is_at_stage")
      .delete()
      .neq("batch_id", 0); // Delete all records (neq with impossible value)

    if (error) {
      console.error("Error clearing batch stages table:", error);
      return false;
    }
    console.log("BATCH_IS_AT_STAGE table cleared successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

// Insert a new record into the batch_is_at_stage table
async function insertBatchStage(
  batch_ID,
  plant_ID,
  stage_name,
  start_date,
  end_date
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("batch_is_at_stage").insert({
      batch_id: batch_ID,
      plant_id: plant_ID,
      stage_name: stage_name,
      start_date: start_date,
      end_date: end_date,
    });

    if (error) {
      console.error("Error inserting batch stage:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

// Update an existing record in the batch_is_at_stage table
async function updateBatchStage(
  batch_ID,
  plant_ID,
  stage_name,
  start_date,
  end_date
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("batch_is_at_stage")
      .update({
        start_date: start_date,
        end_date: end_date,
      })
      .eq("batch_id", batch_ID)
      .eq("plant_id", plant_ID)
      .eq("stage_name", stage_name);

    if (error) {
      console.error("Error updating batch stage:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

// Delete a record from the batch_is_at_stage table
async function deleteBatchStage(batch_ID, plant_ID, stage_name) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("batch_is_at_stage")
      .delete()
      .eq("batch_id", batch_ID)
      .eq("plant_id", plant_ID)
      .eq("stage_name", stage_name);

    if (error) {
      console.error("Error deleting batch stage:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

module.exports = {
  fetchBatchStagesFromDb,
  initiateBatchStages,
  insertBatchStage,
  updateBatchStage,
  deleteBatchStage,
};
