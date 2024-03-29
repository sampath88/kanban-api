const mongoose = require("mongoose");

const connectWithDb = () => {
  return mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB Connected successfully`))
    .catch((err) => {
      console.log("DB Connection issue");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;
