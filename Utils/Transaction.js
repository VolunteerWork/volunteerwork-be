import mongoose from "mongoose";

const createTransaction=async(func, callback)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const result = await func(session);
    await session.commitTransaction();
    return result;
  } catch(error){
    await session.abortTransaction();
    if(callback) await callback();
    throw error;
  } finally{
     session.endSession();
  }
}

export default createTransaction;