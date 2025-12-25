import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    if (typeof decoded === "string" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = (decoded as { userId: string }).userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
