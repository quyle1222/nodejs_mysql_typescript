/** @format */

import { Request, Response } from "express";
import { user } from "../../models/auth/user";
import { database } from "../../..";
import { MysqlError } from "mysql";

const register = async (req: Request, res: Response) => {
  const { body }: { body: user } = req;
  const { username, password }: user = body;
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

export default register;
