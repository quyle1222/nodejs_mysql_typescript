/** @format */

import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_config";

const verifyToken = (
  req: { headers: { [x: string]: any }; userId: string | number },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: {
        (arg0: { message: string; success: boolean }):
          | jwt.VerifyCallback<string | jwt.Jwt | jwt.JwtPayload>
          | undefined;
        new (): any;
      };
    };
  },
  next: () => void,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
      success: false,
    });
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        success: false,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
