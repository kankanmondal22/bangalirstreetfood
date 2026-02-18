import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
});

const TourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    days: Number,

    adultPrice: Number,
    childPrice: Number,

    itinerary: [ItinerarySchema],

    foodingAndLodging: String,
    images: [String],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.TourPackage ||
  mongoose.model("TourPackage", TourPackageSchema);
