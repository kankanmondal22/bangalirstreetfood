"use server";

import dbConnect from "@/utils/db";
import TourPackage, { ITourPackage } from "@/model/TourPackage";
import {
  CreateTourPackageData,
  TourPackageData,
} from "../_forms/TourPackageForm";
import { requireSession } from "./user-actions";

// {
//     "title": "sample title",
//     "slug": "",
//     "description": "sample title",
//     "days": 1,
//     "adultPrice": 100,
//     "childPrice": 100,
//     "itinerary": [
//         {
//             "day": 1,
//             "title": "kalna",
//             "description": "kantu er bari"
//         }
//     ],
//     "foodingAndLodging": "free",
//     "journeyDates": [
//         {
//             "startDate": "2003-02-20",
//             "endDate": "2003-02-25"
//         }
//     ],
//     "images": {
//         "0": {}
//     },
//     "pickupAt": "sdah",
//     "dropAt": "sdah",
//     "isActive": true
// }

export async function createTourPackage(data: CreateTourPackageData) {
  try {
    await dbConnect();
    await requireSession();
    // append timestamp
    const slug =
      data.title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const pkg = await TourPackage.create({ ...data, slug });
    // check if created successfully
    if (!pkg) throw new Error("Failed to create tour package");
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    console.error("Create tour package error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function updateTourPackage(id: string, data: TourPackageData) {
  try {
    await dbConnect();
    await requireSession();
    const pkg = await TourPackage.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true },
    );
    if (!pkg) throw new Error("Tour package not found");
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    console.error("Update tour package error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function fetchTourPackage(id: string) {
  try {
    await dbConnect();
    const pkg = await TourPackage.findById(id).lean();
    if (!pkg) throw new Error("Tour package not found");
    return JSON.parse(JSON.stringify(pkg));
  } catch (error) {
    console.error("Fetch tour package error:", error);
    throw error;
  }
}

export async function fetchAllTourPackages() {
  try {
    await dbConnect();
    const packages = await TourPackage.find()
      .sort({ createdAt: -1 })
      .lean<ITourPackage[]>();
    return packages;
  } catch (error) {
    console.error("Fetch all tour packages error:", error);
    throw error;
  }
}

export async function deleteTourPackage(id: string) {
  try {
    await dbConnect();
    const pkg = await TourPackage.findByIdAndDelete(id);
    if (!pkg) throw new Error("Tour package not found");
    return { ok: true };
  } catch (error) {
    console.error("Delete tour package error:", error);
    throw error;
  }
}
