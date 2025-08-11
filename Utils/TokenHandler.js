import jwt from "jsonwebtoken";
import { SECRET_KEY,EXPIRATION } from "../Config/index.js";
import { TokenBearer } from "./Constraints.js";

const TokenHandler={
  generateToken: (account)=>{
    var dataInToken={_id:account._id, role: account.role};
    var token = jwt.sign(dataInToken, SECRET_KEY, { algorithm:"HS256", expiresIn: EXPIRATION*1000});
    return TokenBearer + token;
  }
}

export default TokenHandler;