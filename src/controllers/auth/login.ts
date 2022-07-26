/** @format */

import { Request, Response } from "express";
import { userCreate } from "../../models/auth/userCreate";
import { database } from "../../..";
import { MysqlError } from "mysql";

export default async (req: Request, res: Response) => {
  const { body }: { body: userCreate } = req;
  const { username, password }: userCreate = body;
  const query = `INSERT INTO User (userId, password) VALUES ("${username}","${password}")`;
  database.query(query, (error: MysqlError, results: any) => {
    if (error) {
      res.statusCode = 500;
      res.send({
        success: false,
        error: error,
      });
    }
    res.statusCode = 200;
    res.send({
      success: true,
      data: results,
      message: "Create user success",
    });
  });
};
