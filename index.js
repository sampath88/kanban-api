require("dotenv").config();

const app = require("./app");
const connectWithDb = require("./config/db");
const PORT = process.env.PORT || 4000;

// Connect with database
connectWithDb();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
