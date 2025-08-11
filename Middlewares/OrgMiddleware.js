import AuthError from "../Errors/AuthError.js";
import Organization from "../Models/Organization.js";
import { ORGANIZATION } from "../Utils/Constraints.js";
import { getAccountFromToken } from "./AuthMiddleware.js";

const OrgMiddleware=async(req,res,next)=>{
  try{
    const account= await getAccountFromToken(req);
    if(account.role!=ORGANIZATION) throw new AuthError("This endpoint is only for organizations");
    
    var org=await Organization.findOne({account:account._id});
    
    // if(!org.isVerified) throw new AuthError("This organization need to be verified by admin");
    if(!org) throw new AuthError("Organization with accountId "+account._id+" does not exist");
    
    req.org=org;
    next();
  }
  catch(error){
    next(error);
  }
}

export default OrgMiddleware;