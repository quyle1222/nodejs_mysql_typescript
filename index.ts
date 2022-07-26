/** @format */

import express, { Request, Response } from "express";
import { database_config } from "./src/config/database_config";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

export const database = mysql.createConnection(database_config);

database.connect((err: Error) => {
  if (err) {
    console.log("database.connect", err);
    return;
  }
  console.log("database.connect - Connected Success!!!");
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    data: null,
    success: true,
  });
});

app.listen(3000, () => {
  console.log("Node server running @ http://localhost:3000");
});

require("./src/routes/index")(app);
