import jwt from "jsonwebtoken";
import AuthError from "../Errors/AuthError.js";
import Account from "../Models/Account.js";
import { TokenBearer } from "../Utils/Constraints.js";
import { JWT_SECRET_KEY } from "../Config/index.js";

export async function getAccountFromToken(req) {
  const rawToken = req.headers["authorization"];

  if (!rawToken) throw new AuthError("Unauthorized");
  if (!rawToken.startsWith(TokenBearer)) throw new AuthError("Unauthorized");

  const token = rawToken.substring(7);

  const accountId = jwt.verify(token, JWT_SECRET_KEY);
  return await Account.findById(accountId);
}

const AuthMiddleware = async (req, res, next) => {
  try {
    req.account = await getAccountFromToken(req);
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export default AuthMiddleware;