/** @format */

import { Request, Response } from "express";
import { user } from "../../models/auth/user";
import { database } from "../../..";
import { MysqlError } from "mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDB } from "../../models/auth/userDB";
import { secret } from "../../config/jwt_config";

const login = async (req: Request, res: Response) => {
  const { body }: { body: user } = req;
  const { username, password }: user = body;
  if (!username?.trim() || !password?.trim()) {
    res.status(404).send({
      success: false,
      message: "Username and password is require",
    });
  }
  const query = `SELECT userId, password FROM User WHERE userId="${username}" LIMIT 1;`;

  database.query(query, (error: MysqlError, result: Array<object>) => {
    if (error) {
      return res.status(500).send({
        success: true,
        error: error,
        data: null,
      });
    }
    const dataResult = <UserDB>result?.[0];
    const passwordIsValid = bcrypt.compare(password, dataResult.password);
    const token = jwt.sign({
      id: username
    }, secret, {
      expiresIn: 86400, // 24 hours
    });

    if (!passwordIsValid) {
      return res.status(401).send({
        success: false,
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    res.status(200).send({
      success: true,
      data: { token },
    });
  });
};

export default login;
