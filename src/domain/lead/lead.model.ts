import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leadSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  alternativePhoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  communication: String,
  termsAndCondition: Boolean,
  createdDate: Date,
  updatedDate: Date
});

export default mongoose.model("Lead", leadSchema);
