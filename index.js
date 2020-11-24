const db = require("./data/db.js");
const express = require("express");
const noteRoutes = require("./routes/courses.js");
const searchRoutes = require("./routes/search.js");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 4567;

db.connect();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(noteRoutes);
app.use(searchRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});