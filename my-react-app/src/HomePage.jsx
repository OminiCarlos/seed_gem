import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Seed Gem Database Application</h1>
      <p>Click the links below to access different sections of the database application:</p>

      <nav>
        <ul>
          <li><Link to="/batches">All Batches</Link></li>
          <li><Link to="/batch-stage">Batches at Stage</Link></li>
          {/* <li><Link to="/batch-summary">Batch Summary</Link></li> */}
          <li><Link to="/locations">All Locations</Link></li>
          <li><Link to="/orders">All Orders</Link></li>
          <li><Link to="/order-items">All Order Items</Link></li>
          <li><Link to="/plants">All Plants</Link></li>
          <li><Link to="/plant-tags">Plants-Tags</Link></li>
          <li><Link to="/tags">All Tags</Link></li>
          <li><Link to="/stages">All Stages</Link></li>
          <li><Link to="/cultivars">All Cultivars</Link></li>
          <li><Link to="/suppliers">All Suppliers</Link></li>
          <li><Link to="/users">All Users</Link></li>
          <li><Link to="/PlantEventLogs">Plant Event Records</Link></li>
          <li><Link to="/soil-conditions">Soil Condition List</Link></li>
          <li><Link to="/location-soil">Condition of the soil in each area</Link></li>
        </ul>
      </nav>
    </div>
  );
}
