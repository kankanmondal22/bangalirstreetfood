import { HydratedDocument, Schema, model, models } from "mongoose";

interface IItinerary {
  day: number;
  title: string;
  description: string;
}

export interface ITourPackage {
  title: string;
  slug: string;
  description?: string;
  days?: number;
  adultPrice?: number;
  childPrice?: number;
  itinerary?: IItinerary[];
  foodingAndLodging?: string;
  images?: string[];
  isActive?: boolean;
}

const ItinerarySchema = new Schema<IItinerary>({
  day: Number,
  title: String,
  description: String,
});

const TourPackageSchema = new Schema<ITourPackage>(
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

const TourPackage =
  models.TourPackage || model<ITourPackage>("TourPackage", TourPackageSchema);

export default TourPackage;

export type TourPackageDocument = HydratedDocument<ITourPackage>;
