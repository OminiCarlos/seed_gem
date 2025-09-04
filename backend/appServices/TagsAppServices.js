const { withSupabase } = require("../appService.js");

// above should be unchanged

// adding new services from here!

async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("TAG").select("*");
    if (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching tags:", err);
    return [];
  });
}

// Table creation/reset should be managed in Supabase dashboard.
async function initiateDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

//
async function insertDemotable(tag) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("TAG").insert([{ tag }]);
    if (error) {
      console.error("Error inserting tag:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting tag:", err);
    return false;
  });
}

async function deleteDemotable(tag) {
  console.log("got to delete tag.");
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("TAG").delete().eq("tag", tag);
    if (error) {
      console.error("Error deleting tag:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting tag:", err);
    return false;
  });
}

module.exports = {
  initiateDemotable,
  insertDemotable,
  fetchDemotableFromDb,
  deleteDemotable,
};
