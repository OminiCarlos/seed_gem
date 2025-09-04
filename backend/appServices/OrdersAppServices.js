const { withSupabase } = require("../appService.js");

// above should be unchanged

// adding new services from here!
// Table creation/reset should be managed in Supabase dashboard.
async function initiateDemotable() {
  console.log("Table creation/reset should be managed in Supabase dashboard.");
  return false;
}

//
async function insertDemotable(order_id, order_date, order_comment) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase.from("ORDERS").insert([
      {
        order_id,
        order_date,
        order_comment,
      },
    ]);
    if (error) {
      console.error("Error inserting order:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error inserting order:", err);
    return false;
  });
}

async function fetchDemotableFromDb() {
  return await withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("ORDERS").select("*");
    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
    return data || [];
  }).catch((err) => {
    console.error("Error fetching orders:", err);
    return [];
  });
}

async function updateDemotable(order_id, order_date, order_comment) {
  console.log("service update orders called.");
  console.log({ order_id, order_date, order_comment });
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("ORDERS")
      .update({
        order_date,
        order_comment,
      })
      .eq("order_id", order_id);
    if (error) {
      console.error("Error updating order:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error updating order:", err);
    return false;
  });
}

async function deleteDemotable(order_id) {
  return await withSupabase(async (supabase) => {
    const { error } = await supabase
      .from("ORDERS")
      .delete()
      .eq("order_id", order_id);
    if (error) {
      console.error("Error deleting order:", error);
      return false;
    }
    return true;
  }).catch((err) => {
    console.error("Error deleting order:", err);
    return false;
  });
}

async function updateDisplayDemotable(order_id, order_date, order_comment) {
  return await withSupabase(async (supabase) => {
    // Whitelist and validate column names
    const validColumns = {
      order_id: "order_id",
      order_date: "order_date",
      order_comment: "order_comment",
    };
    const selectedColumns = [];
    if (order_id) selectedColumns.push(validColumns.order_id);
    if (order_date) selectedColumns.push(validColumns.order_date);
    if (order_comment) selectedColumns.push(validColumns.order_comment);
    const selection = selectedColumns.join(",");
    if (!selection) {
      throw new Error("No columns selected for the query");
    }
    const { data, error } = await supabase.from("ORDERS").select(selection);
    if (error) {
      console.error("Error executing query:", error);
      return false;
    }
    return data || [];
  }).catch((err) => {
    console.error("Error executing query:", err);
    return false;
  });
}

module.exports = {
  initiateDemotable,
  insertDemotable,
  fetchDemotableFromDb,
  updateDemotable,
  deleteDemotable,
  updateDisplayDemotable,
};
