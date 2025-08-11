import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema.Types

const OrganizationSchema = new Schema({
	account: {
		type: ObjectId,
		ref: 'Account',
		required: true,
	},
	name: String,
	description: String,
	avatarUrl: String,
	facebookLink: String,
	affiliatedUnit: String,
	contactInfo: String,
	isVerified: Boolean,
});
OrganizationSchema.statics.findWithPagination=async(page, limit)=>{
	return await Organization.find()
		.limit(limit)
		.skip((page-1)*limit)
		.exec();
}
OrganizationSchema.statics.countAll=async()=>{
	return await Organization.countDocuments();
}
const Organization = new mongoose.model('Organization', OrganizationSchema)
export default Organization;
