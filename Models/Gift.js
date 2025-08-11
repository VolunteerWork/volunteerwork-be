import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;
const GiftSchema=new Schema({
          giftName: {
                    type: String,
                    required: true
          },
          price: Number,
          imageUrl: String,
          description: String,
          requiredCoins: Number,
          receiverInfo:{
                    studentId: ObjectId,
                    receiverAddress: String,                 
                    receivedDate: Date
          }
});
const Gift=new mongoose.model("Gift", GiftSchema);
export default Gift;
