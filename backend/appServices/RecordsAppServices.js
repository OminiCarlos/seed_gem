const { withSupabase } = require("../appService.js");

async function fetchEventRecordsFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("Plant_event_records_user_batch")
      .select("*");
    if (error) {
      console.error("Error fetching event records:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching event records:", err);
    return [];
  });
}

// Table creation is managed in Supabase dashboard. This function is not needed.
async function initiateEventRecords() {
  console.log("Table creation should be managed in Supabase dashboard.");
  return false;
}

async function insertEventRecord(
  event_title,
  event_date,
  event_instruction,
  event_observation,
  batch_ID,
  user_ID
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("EVENT_RECORDS").insert([
      {
        event_title,
        event_date,
        event_instruction,
        event_observation,
        batch_ID,
        user_ID,
      },
    ]);
    if (error) {
      console.error("Error inserting event record:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting event record:", err);
    return false;
  });
}

async function updateEventRecord(
  event_id,
  event_title,
  event_date,
  event_instruction,
  event_observation,
  batch_ID,
  user_ID
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("EVENT_RECORDS")
      .update({
        event_title,
        event_date,
        event_instruction,
        event_observation,
        batch_ID,
        user_ID,
      })
      .eq("event_id", event_id);
    if (error) {
      console.error("Error updating event record:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating event record:", err);
    return false;
  });
}

async function deleteEventRecord(event_id) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("EVENT_RECORDS")
      .delete()
      .eq("event_id", event_id);
    if (error) {
      console.error("Error deleting event record:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting event record:", err);
    return false;
  });
}

module.exports = {
  fetchEventRecordsFromDb,
  initiateEventRecords,
  insertEventRecord,
  updateEventRecord,
  deleteEventRecord,
};
