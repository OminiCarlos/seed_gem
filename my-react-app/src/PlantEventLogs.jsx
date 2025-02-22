import { useState, useEffect } from "react";

export default function EventLogs() {
  // State for event records
  const [events, setEvents] = useState([]);
  const [dbStatus, setDbStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);
  const [insertData, setInsertData] = useState({
    title: "",
    date: "",
    instruction: "",
    observation: "",
    batchId: "",
    userId: "",
  });
  const [updateData, setUpdateData] = useState({
    eventId: "",
    title: "",
    date: "",
    instruction: "",
    observation: "",
    batchId: "",
    userId: "",
  });
  const [deleteEventId, setDeleteEventId] = useState("");
  const [insertResultMsg, setInsertResultMsg] = useState("");
  const [updateResultMsg, setUpdateResultMsg] = useState("");
  const [deleteResultMsg, setDeleteResultMsg] = useState("");
  const [countResultMsg, setCountResultMsg] = useState("");

  // Fetch all event records on load
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setDbStatus("Connected");
        setLoading(false);
      })
      .catch((error) => {
        setDbStatus("Failed to connect");
        setLoading(false);
      });
  }, []);

  // Handle inserting new event record
  const handleInsert = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insertData),
    });
    const data = await response.json();
    setInsertResultMsg(data.message || "Error inserting record.");
  };

  // Handle updating event record
  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/events/${updateData.eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    setUpdateResultMsg(data.message || "Error updating record.");
  };

  // Handle deleting an event record
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/events/${deleteEventId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setDeleteResultMsg(data.message || "Error deleting record.");
  };

  // Handle counting event records
  const handleCount = async () => {
    const response = await fetch("/api/events/count");
    const data = await response.json();
    setCountResultMsg(`Total Events: ${data.count}`);
  };

 async function getDataFromSupabase () {

 } 

  return (
    <div>
      <h1>
        Database Connection Status: <span>{dbStatus}</span>
        {loading && <img src="loading_100px.gif" alt="Loading..." />}
      </h1>

      <h2>Show All Event Records</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Title</th>
            <th>Event Date</th>
            <th>Event Instruction</th>
            <th>Event Observation</th>
            <th>Batch ID</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventId}>
              <td>{event.eventId}</td>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.instruction}</td>
              <td>{event.observation}</td>
              <td>{event.batchId}</td>
              <td>{event.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Insert New Event Record</h2>
      <form onSubmit={handleInsert}>
        <input
          type="text"
          placeholder="Enter Event Title"
          value={insertData.title}
          onChange={(e) => setInsertData({ ...insertData, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={insertData.date}
          onChange={(e) => setInsertData({ ...insertData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Enter Instruction"
          value={insertData.instruction}
          onChange={(e) => setInsertData({ ...insertData, instruction: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Observation"
          value={insertData.observation}
          onChange={(e) => setInsertData({ ...insertData, observation: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Batch ID"
          value={insertData.batchId}
          onChange={(e) => setInsertData({ ...insertData, batchId: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Enter User ID"
          value={insertData.userId}
          onChange={(e) => setInsertData({ ...insertData, userId: e.target.value })}
          required
        />
        <button type="submit">Insert</button>
      </form>
      <div>{insertResultMsg}</div>

      <h2>Update Event Record</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Enter Event ID"
          value={updateData.eventId}
          onChange={(e) => setUpdateData({ ...updateData, eventId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Enter New Event Title"
          value={updateData.title}
          onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
      <div>{updateResultMsg}</div>

      <h2>Delete an Event Record</h2>
      <form onSubmit={handleDelete}>
        <input
          type="number"
          placeholder="Enter Event ID to Delete"
          value={deleteEventId}
          onChange={(e) => setDeleteEventId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
      <div>{deleteResultMsg}</div>

      <h2>Count the Event Records</h2>
      <button onClick={handleCount}>Count</button>
      <div>{countResultMsg}</div>
    </div>
  );
}
