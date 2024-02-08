require("dotenv").config();

const app = require("./app");
const connectWithDb = require("./config/db");
const PORT = process.env.PORT || 4000;

async function run() {
  try {
    // Connect with database
    await connectWithDb();

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.log("DB connection failed: ", error);
  }
}

run();
