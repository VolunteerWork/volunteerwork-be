import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET_KEY } from "../Config/index.js";
import { TokenBearer } from "./Constraints.js";

const TokenHandler={
  generateToken: (account)=>{
    var dataInToken={_id:account._id, role: account.role};
    var token = jwt.sign(
      dataInToken, 
      JWT_SECRET_KEY, 
      { algorithm:"HS256", expiresIn: JWT_EXPIRATION*1000}
    );
    
    return TokenBearer + token;
  }
}

export default TokenHandler;