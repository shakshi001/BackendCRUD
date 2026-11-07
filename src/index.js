import dotenv from "dotenv";
// import express from "express";
import app from "./app.js";
dotenv.config({
  path: "./src/.env",
});

//const app = express();
const port = process.env.PORT || 3000;

// app.get("/instagram", (req, res) => {
//   res.send("this is an instagram page");
// });

app.listen(port, () => {
  console.log(`example app listening on port http://localhost:${port}`);
});
