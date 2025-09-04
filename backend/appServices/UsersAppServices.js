const { withSupabase } = require("../appService.js");

async function fetchUserDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("Userr").select("*");
    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching users:", err);
    return [];
  });
}

// Table creation/reset should be managed in Supabase dashboard.
async function initiateUserDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

async function insertUserDemotable(user_id, user_name, user_note) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("Userr").insert([
      {
        user_id,
        user_name,
        user_note,
      },
    ]);
    if (error) {
      console.error("Error inserting user:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting user:", err);
    return false;
  });
}

async function updateUserDemotable(user_id, user_name, user_note) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Userr")
      .update({
        user_name,
        user_note,
      })
      .eq("user_id", user_id);
    if (error) {
      console.error("Error updating user:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating user:", err);
    return false;
  });
}

async function deleteUserDemotable(user_id) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("Userr")
      .delete()
      .eq("user_id", user_id);
    if (error) {
      console.error("Error deleting user:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting user:", err);
    return false;
  });
}

module.exports = {
  fetchUserDemotableFromDb,
  initiateUserDemotable,
  insertUserDemotable,
  updateUserDemotable,
  deleteUserDemotable,
};
