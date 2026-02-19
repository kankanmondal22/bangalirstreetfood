import { IItinerary } from "./TourPackage";

export interface TourPackage {
  id: string;

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

  createdAt: Date;
  updatedAt: Date;
}
