const express = require("express");
const colaboratorRouter = require("./routes/colaboratorRoutes");
const characterRoutes = require("./routes/characterRoutes");
const mongoose = require("./database/Mongo");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/colaborators", colaboratorRouter);

app.use("/api/characters", characterRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
