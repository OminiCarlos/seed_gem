const { supabase, withSupabase } = require("../appService");

// adding new services from here!
async function initiateDemotable() {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("location")
      .delete()
      .neq("field_name", "");

    if (error) {
      console.error("Error clearing Location table:", error);
      return false;
    }

    console.log("LOCATION table cleared successfully!");
    return true;
  }).catch(() => {
    return false;
  });
}

//
async function insertDemotable(
  // change these to the attributes in your table.
  field_name,
  zone_id,
  is_outdoor,
  is_irrigated
) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("location").insert({
      field_name: field_name,
      zone_id: zone_id,
      is_outdoor: is_outdoor,
    });

    if (error) {
      console.error("Error inserting location:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  try {
    const { data, error } = await supabase.from("location").select("*");
    console.log(data);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function listFieldNames() {
  try {
    const { data, error } = await supabase
      .from("location")
      .select("field_name");

    const uniqueItems = [
      ...new Set(
        data.map((item) => {
          return item.field_name;
        })
      ),
    ];
    const options = uniqueItems.map((item) => ({
      value: item,
      label: item,
    }));
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return options;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function updateDemotable(field_name, zone_id, is_outdoor) {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("location")
      .update({ is_outdoor: is_outdoor })
      .eq("field_name", field_name)
      .eq("zone_id", zone_id);

    if (error) {
      console.error("Error updating location:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function deleteDemotable(field_name, zone_id) {
  zone_id = parseInt(zone_id);
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase
      .from("location")
      .delete()
      .eq("field_name", field_name)
      .eq("zone_id", zone_id);

    if (error) {
      console.error("Error deleting location:", error);
      return false;
    }
    return true;
  }).catch(() => {
    return false;
  });
}

async function filterDemotable(showOutdoor, showIndoor) {
  return await withSupabase(async (supabase) => {
    // Build query based on filter options
    let query = supabase.from("location").select(`
        field_name,
        zone_id,
        is_outdoor,
        location_irrigation!inner(is_irrigated)
      `);

    // Apply filters
    const conditions = [];
    if (showOutdoor == 1) {
      conditions.push("is_outdoor.eq.true");
    }
    if (showIndoor == 1) {
      conditions.push("is_outdoor.eq.false");
    }

    if (conditions.length === 1) {
      if (showOutdoor == 1) {
        query = query.eq("is_outdoor", true);
      } else {
        query = query.eq("is_outdoor", false);
      }
    }
    // If both or neither are selected, don't add filters (show all)

    const { data, error } = await query;

    if (error) {
      console.error("Error filtering locations:", error);
      return [];
    }
    return data || [];
  }).catch((error) => {
    console.error("Error filtering demotable:", error);
    return [];
  });
}

module.exports = {
  initiateDemotable: initiateDemotable,
  insertDemotable: insertDemotable,
  fetchDemotableFromDb: fetchDemotableFromDb,
  updateDemotable: updateDemotable,
  deleteDemotable: deleteDemotable,
  filterDemotable,
  listFieldNames,
};
