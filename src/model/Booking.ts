import { Schema, model, models } from "mongoose";

const MemberSchema = new Schema({
  name: String,
  type: { type: String, enum: ["ADULT", "CHILD"] },
});

const BookingSchema = new Schema(
  {
    packageId: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true },
);

export default models.Booking || model("Booking", BookingSchema);
