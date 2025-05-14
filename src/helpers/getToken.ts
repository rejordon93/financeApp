// utils/verifyToken.ts
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

export function verifyToken(token: string): TokenPayload {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET not set");
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as TokenPayload;
  return decoded;
}
