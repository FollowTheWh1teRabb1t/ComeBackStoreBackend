import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export class Token {
  static generate(payload: object) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  static verify<T>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
  }
}
