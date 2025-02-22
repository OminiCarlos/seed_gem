const express = require("express");
const appController = require("./appController");
const loadEnvFile = require("./utils/envUtil");
const cors = require("cors");

// Load environment variables from .env file
const envVariables = loadEnvFile("./.env");

const app = express();

const PORT = envVariables.PORT || 65534; // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(express.json()); // Parse incoming JSON payloads
app.use(cors());

// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/home.html');
// });

// mount the router
app.use("/", appController);

// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
