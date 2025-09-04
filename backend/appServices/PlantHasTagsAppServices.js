const { withSupabase } = require("../appService.js");

// Check Supabase connection
async function checkDbConnection() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("PLANT_HAS_TAGS")
      .select("plant_id")
      .limit(1);
    if (error) {
      console.error("Supabase connection check failed:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Supabase connection check failed:", err);
    return false;
  });
}

// Fetch all plant tags from Supabase
async function fetchPlantTagsFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("PLANT_HAS_TAGS")
      .select("plant_id, tag");
    if (error) {
      console.error("Error fetching plant tags:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching plant tags:", err);
    return [];
  });
}

// Insert a new tag for a plant using Supabase
async function insertPlantTag(plant_id, tag) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("PLANT_HAS_TAGS")
      .insert([{ plant_id, tag }]);
    if (error) {
      console.error("Error inserting plant tag:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting plant tag:", err);
    return false;
  });
}

// Update an existing tag for a plant using Supabase
async function updatePlantTag(plant_id, oldTag, newTag) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("PLANT_HAS_TAGS")
      .update({ tag: newTag })
      .eq("plant_id", plant_id)
      .eq("tag", oldTag);
    if (error) {
      console.error("Error updating plant tag:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating plant tag:", err);
    return false;
  });
}

// Delete a tag for a plant using Supabase
async function deletePlantTag(plant_id, tag) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("PLANT_HAS_TAGS")
      .delete()
      .eq("plant_id", plant_id)
      .eq("tag", tag);
    if (error) {
      console.error("Error deleting plant tag:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting plant tag:", err);
    return false;
  });
}

module.exports = {
  checkDbConnection,
  fetchPlantTagsFromDb,
  insertPlantTag,
  updatePlantTag,
  deletePlantTag,
};
