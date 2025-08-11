import AuthError from "../Errors/AuthError.js";
import Student from "../Models/Student.js";
import { STUDENT } from "../Utils/Constraints.js";
import { getAccountFromToken } from "./AuthMiddleware.js";

const StudentMiddleware=async(req,res,next)=>{
  try{
    const account= await getAccountFromToken(req);
    if(account.role!=STUDENT) throw new AuthError("This endpoint is only for students");
                    
    var student=await Student.findOne({account:account._id});
    if(!student) throw new AuthError("Student with accountId "+account._id+" does not exist");
                    
    req.student=student;
    next();
  }
  catch(error) {
    next(error);
    console.log(error)
  }
}

export default StudentMiddleware;