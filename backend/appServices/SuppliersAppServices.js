const { withSupabase } = require("../appService.js");

async function fetchSupplierDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("SUPPLIER").select("*");
    if (error) {
      console.error("Error fetching suppliers:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching suppliers:", err);
    return [];
  });
}

// Table creation/reset should be managed in Supabase dashboard.
async function initiateSupplierDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

async function insertSupplierDemotable(
  supplier_id,
  supplier_name,
  supplier_address,
  supplier_tel
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("SUPPLIER").insert([
      {
        supplier_id,
        supplier_name,
        supplier_address,
        supplier_tel,
      },
    ]);
    if (error) {
      console.error("Error inserting supplier:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting supplier:", err);
    return false;
  });
}

async function updateSupplierDemotable(
  supplier_id,
  supplier_name,
  supplier_address,
  supplier_tel
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("SUPPLIER")
      .update({
        supplier_name,
        supplier_address,
        supplier_tel,
      })
      .eq("supplier_id", supplier_id);
    if (error) {
      console.error("Error updating supplier:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating supplier:", err);
    return false;
  });
}

async function deleteSupplierDemotable(supplier_id) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("SUPPLIER")
      .delete()
      .eq("supplier_id", supplier_id);
    if (error) {
      console.error("Error deleting supplier:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting supplier:", err);
    return false;
  });
}

module.exports = {
  fetchSupplierDemotableFromDb,
  initiateSupplierDemotable,
  insertSupplierDemotable,
  updateSupplierDemotable,
  deleteSupplierDemotable,
};
