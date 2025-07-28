const { withSupabase } = require("../appService.js");

// above should be unchanged

// adding new services from here!

async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("plant").select("*");

    if (error) {
      console.error("Error fetching plants:", error);
      return [];
    }
    return data || [];
  }).catch(() => {
    return [];
  });
}

async function initiateDemotable() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("plant").delete().neq("plant_id", 0);

    if (error) {
      console.error("Error clearing Plant table:", error);
      return false;
    }

    console.log("Plant table cleared successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

//
async function insertDemotable(
  // change these to the attributes in your table.
  plant_id,
  yield_type,
  common_name,
  scientific_name,
  overview_notes
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("plant").insert({
      plant_id: plant_id,
      yield_type: yield_type,
      common_name: common_name,
      scientific_name: scientific_name,
      overview_notes: overview_notes,
    });

    if (error) {
      console.error("Error inserting plant:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function updateDemotable(
  plant_id,
  yield_type,
  common_name,
  scientific_name,
  overview_notes
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("plant")
      .update({
        yield_type: yield_type,
        common_name: common_name,
        scientific_name: scientific_name,
        overview_notes: overview_notes,
      })
      .eq("plant_id", plant_id);

    if (error) {
      console.error("Error updating plant:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(plant_id) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("plant")
      .delete()
      .eq("plant_id", plant_id);

    if (error) {
      console.error("Error deleting plant:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function countDemotable() {
  return await withSupabase(async (supabase) => {
    const { count, error } = await supabase
      .from("plant")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error counting plants:", error);
      return -1;
    }
    return count || 0;
  }).catch(() => {
    return -1;
  });
}

async function countFruitYieldingPlants() {
  return await withSupabase(async (supabase) => {
    const { count, error } = await supabase
      .from("plant")
      .select("*", { count: "exact", head: true })
      .ilike("yield_type", "fruit");

    if (error) {
      console.error("Error counting fruit plants:", error);
      return -1;
    }
    return count || 0;
  }).catch(() => {
    return -1;
  });
}

async function getYieldTypeCounts() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.rpc("get_yield_type_counts");

    if (error) {
      console.error("Error fetching yield type counts:", error);
      return [];
    }
    return data || [];
  }).catch((error) => {
    console.error("Error fetching yield type counts:", error);
    return [];
  });
}

async function getCareCountByYieldType() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.rpc("get_care_count_by_yield_type");

    if (error) {
      console.error("Error fetching care count data:", error);
      return [];
    }
    return data || [];
  }).catch((error) => {
    console.error("Error fetching care count data:", error);
    return [];
  });
}

module.exports = {
  initiateDemotable,
  insertDemotable,
  fetchDemotableFromDb,
  updateDemotable,
  deleteDemotable,
  countDemotable,
  countFruitYieldingPlants,
  getYieldTypeCounts,
  getCareCountByYieldType,
};
