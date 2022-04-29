import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      min: 6,
      max: 20,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
