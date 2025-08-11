import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const AccountSchema=new Schema({
          email:{
                    type: String,
                    required: true,
                    unique: true
          },
          password:{
                    type: String,
                    required: true
          },
          role:{
                    type: String,
                    required:true,
                    enum:["STUDENT","ORGANIZATION","ADMIN"]
          },
          isActive: Boolean,
          otpCode: String,
          otpTime: Date
});
AccountSchema.pre('save', async function (next) {
          if (this.isModified('password')) {
              this.password = await bcrypt.hash(this.password, 10);
          }
          next();
});

AccountSchema.statics.findByEmail=async(email)=>{
          return await Account.findOne({email: email});
}
const Account=new mongoose.model("Account",AccountSchema);
export default Account;