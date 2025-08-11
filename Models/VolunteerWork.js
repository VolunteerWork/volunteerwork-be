import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const VolunteerWorkSchema=Schema({
          title: String,
          createdAt: Date,
          endRegisteredDate: Date,
          events:[{type:ObjectId, ref:"Event"}],
          questions: [{type: ObjectId, ref:"Question"}],
          imageUrl: String,
          description: String,
          receivedCoins: Number,
          organization: {
                    type: ObjectId,
                    ref: "Organization",
                    required: true
            },
          contactInfo: String,
          requirements: String,
          benefits: String,
});
VolunteerWorkSchema.statics.findWithPagination=async(page,limit)=>{
          return await VolunteerWork.find()
                                        .populate("organization")
                                        .limit(limit)
                                        .skip((page-1)*limit)
                                        .sort({createdAt:-1})
                                        .exec();
}
VolunteerWorkSchema.statics.countAll=async()=>{
      return await VolunteerWork.countDocuments();
}
VolunteerWorkSchema.statics.countByOrgId=async(organizationId)=>{
      return await VolunteerWork.countDocuments({organization: organizationId});
}
VolunteerWorkSchema.statics.findWithPaginationAndOrgId=
      async(page,limit,organizationId)=>{
            return await VolunteerWork.find({organization: organizationId.toString()})
                                          .limit(limit)
                                          .skip((page-1)*limit)
                                          .sort({createdAt:-1})
                                          .exec();
}
VolunteerWorkSchema.statics.findWithEvents=
          async(volunteerWorkIds, weekRange)=>{
                var volunteerWorks= await VolunteerWork.find({
                              _id: {$in: volunteerWorkIds}
                    })
                    .populate({
                              path: "events",
                              match: {startDate:{
                                        $gte: weekRange.startDate,
                                        $lte: weekRange.endDate
                              }}
                    });
                    return volunteerWorks;
          }
VolunteerWorkSchema.statics.findByIds=
          async(volunteerWorkIds)=>{
                    var volunteerWorks= await VolunteerWork.find({
                              _id: {$in: volunteerWorkIds}
                    })
                    .populate("organization")
                    .exec();
                    return volunteerWorks;
          }
const VolunteerWork= new mongoose.model("VolunteerWork", VolunteerWorkSchema);
export default VolunteerWork;