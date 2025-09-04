const { withSupabase } = require("../appService.js");

// Table creation/reset should be managed in Supabase dashboard.
async function initiateDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

// Insert a new order item
async function insertDemotable(
  order_ID,
  item_ID,
  plant_ID,
  quantity,
  unit,
  item_price,
  supplier_ID,
  item_comment
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("ORDER_ITEM").insert([
      {
        order_ID,
        item_ID,
        plant_ID,
        quantity,
        unit,
        item_price,
        supplier_ID,
        item_comment,
      },
    ]);
    if (error) {
      console.error("Error inserting order item:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting order item:", err);
    return false;
  });
}

// Fetch all order items
async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("ORDER_ITEM").select("*");
    if (error) {
      console.error("Error fetching order items:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching order items:", err);
    return [];
  });
}

// Update an existing order item
async function updateDemotable(
  order_ID,
  item_ID,
  plant_ID,
  quantity,
  unit,
  item_price,
  supplier_ID,
  item_comment
) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("ORDER_ITEM")
      .update({
        plant_ID,
        quantity,
        unit,
        item_price,
        supplier_ID,
        item_comment,
      })
      .eq("order_ID", order_ID)
      .eq("item_ID", item_ID);
    if (error) {
      console.error("Error updating order item:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating order item:", err);
    return false;
  });
}

// Delete an order item
async function deleteDemotable(order_ID, item_ID) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("ORDER_ITEM")
      .delete()
      .eq("order_ID", order_ID)
      .eq("item_ID", item_ID);
    if (error) {
      console.error("Error deleting order item:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting order item:", err);
    return false;
  });
}

// Export the services
module.exports = {
  initiateDemotable,
  insertDemotable,
  fetchDemotableFromDb,
  updateDemotable,
  deleteDemotable,
};
