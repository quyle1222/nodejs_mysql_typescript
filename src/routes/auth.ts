/** @format */

import { Request, Response } from "express";
import { login, register } from "../controllers/auth";
import { verifyToken } from "../middleware";

module.exports = (app: any) => {
  app.use((req: Request, res: Response, next: Function) => {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept",
    );
    next();
  });

  app.post("/createUser", register);

  app.post("/login", login);
};
