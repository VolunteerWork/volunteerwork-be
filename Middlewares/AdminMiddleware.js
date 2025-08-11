import AuthError from "../Errors/AuthError.js";
import { ADMIN } from "../Utils/Constraints.js";
import { getAccountFromToken } from "./AuthMiddleware.js";


const AdminMiddleware=async(req,res,next)=>{
  try{
    const account= await getAccountFromToken(req);
    if(account.role!=ADMIN) throw new AuthError("This endpoint is only for admins");
    next();
  }
  catch(error){
    next(error);
  }
}
export default AdminMiddleware;