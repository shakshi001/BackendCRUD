const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(() => {
    console.log(`connection is successful`);
  })
  .catch((e) => {
    console.log(`no connection ${e}`);
  });
