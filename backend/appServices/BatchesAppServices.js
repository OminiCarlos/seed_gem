const { withSupabase } = require("../appService.js");

async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("demotable").select("*");
    if (error) {
      console.error("Error fetching demotable:", error);
      return [];
    }
    return data || [];
  }).catch(() => {
    return [];
  });
}

// Adding new services from here!
async function initiateBatchDemotable() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("batch").delete().neq("batch_id", "");

    if (error) {
      console.error("Error clearing batch table:", error);
      return false;
    }
    console.log("BATCH table cleared successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertBatchDemotable(
  batch_id,
  care_notes,
  plant_date,
  yield_weight,
  planted_quantity,
  survived_quantity,
  item_id,
  order_id,
  field_name,
  zone_id
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("batch").insert({
      batch_id: batch_id,
      care_notes: care_notes,
      plant_date: plant_date,
      yield_weight: yield_weight,
      planted_quantity: planted_quantity,
      survived_quantity: survived_quantity,
      item_id: item_id,
      order_id: order_id,
      field_name: field_name,
      zone_id: zone_id,
    });

    if (error) {
      console.error("Error inserting batch:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchBatchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("batch").select("*");
    if (error) {
      console.error("Error fetching batch:", error);
      return [];
    }
    return data || [];
  }).catch(() => {
    return [];
  });
}

async function updateBatchDemotable(
  batch_id,
  care_notes,
  plant_date,
  yield_weight,
  planted_quantity,
  survived_quantity,
  item_id,
  order_id,
  field_name,
  zone_id
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("batch")
      .update({
        care_notes: care_notes,
        plant_date: plant_date,
        yield_weight: yield_weight,
        planted_quantity: planted_quantity,
        survived_quantity: survived_quantity,
        item_id: item_id,
        order_id: order_id,
        field_name: field_name,
        zone_id: zone_id,
      })
      .eq("batch_id", batch_id);

    if (error) {
      console.error("Error updating batch:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function deleteBatchDemotable(batch_id) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("batch")
      .delete()
      .eq("batch_id", batch_id);

    if (error) {
      console.error("Error deleting batch:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

module.exports = {
  fetchDemotableFromDb,
  initiateBatchDemotable,
  insertBatchDemotable,
  fetchBatchDemotableFromDb,
  updateBatchDemotable,
  deleteBatchDemotable,
};
