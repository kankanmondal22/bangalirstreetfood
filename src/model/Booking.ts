import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["ADULT", "CHILD"] },
});

const BookingSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },

    customerName: String,
    phone: String,
    email: String,

    adults: Number,
    children: Number,
    members: [MemberSchema],

    travelDate: Date,

    totalAmount: Number,

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
