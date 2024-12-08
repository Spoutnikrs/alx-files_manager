const express = require("express");
const app = express();

const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", routes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;