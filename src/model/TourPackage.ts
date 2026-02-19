import { HydratedDocument, Schema, model, models, Types } from "mongoose";

//
// Subdocument interface
//
export interface IItinerary {
  day: number;
  title: string;
  description: string;
}

//
// Main document interface (database shape)
//
export interface ITourPackage {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  days?: number;

  adultPrice?: number;
  childPrice?: number;

  itinerary?: IItinerary[];

  foodingAndLodging?: string;
  images?: string[];
  journeyDates?: IJourneyDate[];

  isActive?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IJourneyDate {
  startDate: Date;
  endDate: Date;
}

export type TourPackageDocument = HydratedDocument<ITourPackage>;

//
// Sub schema
//
const ItinerarySchema = new Schema<IItinerary>(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const JourneyDateSchema = new Schema<IJourneyDate>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false },
);

//
// Main schema
//
const TourPackageSchema = new Schema<ITourPackage>(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: String,

    days: Number,
    // multiple journey dates can be added in future, for now we will keep it simple
    journeyDates: {
      type: [JourneyDateSchema],
      default: [],
    },

    adultPrice: Number,
    childPrice: Number,

    itinerary: {
      type: [ItinerarySchema],
      default: [],
    },

    foodingAndLodging: String,

    images: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

//
// Model
//
const TourPackage =
  models.TourPackage || model<ITourPackage>("TourPackage", TourPackageSchema);

export default TourPackage;
