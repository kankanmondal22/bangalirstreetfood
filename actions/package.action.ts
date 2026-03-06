"use server";

type ItineraryItem = {
  day: number;
  description: string;
};

import db from "@/db";
import {
  InsertPackage,
  itineraryTable,
  packagesTable,
  travelDatesTable,
} from "@/db/schema";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { eq, inArray } from "drizzle-orm";
import { start } from "repl";

export const fetchPackages = async ({
  page,
  pageSize = 20,
}: {
  page?: number;
  pageSize?: number;
}) => {
  try {
    const offset = page && page > 0 ? (page - 1) * pageSize : 0;

    const packages = await db
      .select()
      .from(packagesTable)
      .limit(pageSize)
      .offset(offset);

    return packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages");
  }
};

export const getPackageDetailsById = async (id: string) => {
  // PURPOSE:
  // Fetch full package details for /package/[id] detail page.
  //
  // ALGORITHM:
  // Step 1: Validate id (non-empty, valid UUID format)
  //
  // Step 2: Query packages table — fetch ALL fields:
  //   id, title, duration, fullDescription, itinerary, highlights,
  //   inclusions, exclusions, images (all), pricePerAdult, pricePerChild,
  //   maxParticipants, availableDates, pickup, drop, minBookingAmount
  //
  // Step 3: Ensure package status is ACTIVE
  // - If not found → return { success: false, error: "NOT_FOUND" }
  // - If not ACTIVE → return { success: false, error: "UNAVAILABLE" }
  //
  // Step 4 (Optional): Fetch availability summary
  // - Call checkPackageAvailability(id) or inline the query
  // - For each date, show remaining seats / status
  //
  // Step 5: Return complete package object with availability info
};

export const getPackageDetailsByIdForBooking = async (id: string) => {
  // PURPOSE:
  // Fetch only data needed for booking form. Keeps booking page fast.
  // Used by BookingForm component.
  //
  // WHY SEPARATE FROM FULL DETAILS:
  // - No itinerary, highlights, large images
  // - Includes availability per date (needed for seat validation)
  // - Includes minBookingAmount (needed for payment validation)
  //
  // ALGORITHM:
  // Step 1: Validate id (non-empty, valid UUID)
  //
  // Step 2: Query packages table — fetch ONLY:
  //   id, title, pricePerAdult, pricePerChild, maxParticipants,
  //   availableDates, minBookingAmount, status
  //
  // Step 3: Ensure package is ACTIVE
  // - If not found or not ACTIVE → return error
  //
  // Step 4: Fetch reserved seats grouped by date
  // - SELECT selectedDate, COALESCE(SUM(participantsCount), 0) AS reserved
  //   FROM bookings
  //   WHERE packageId = ? AND status IN ('PENDING', 'CONFIRMED')
  //   GROUP BY selectedDate
  //
  // Step 5: For each availableDate, compute:
  // - remainingSeats = maxParticipants - reserved
  // - status: "AVAILABLE" | "LIMITED" | "SOLD_OUT"
  // - Filter out past dates
  //
  // Step 6: Return:
  // {
  //   id,
  //   title,
  //   pricePerAdult,
  //   pricePerChild,
  //   maxParticipants,
  //   minBookingAmount,
  //   dates: [
  //     { date: "2026-03-10", remainingSeats: 8, status: "AVAILABLE" },
  //     { date: "2026-03-17", remainingSeats: 2, status: "LIMITED" },
  //   ]
  // }
  //
  // IMPORTANT:
  // - Never return calculated total price — only base prices
  // - Include minBookingAmount for frontend validation
  // - Include PENDING bookings in seat count to prevent overselling
};

export const createPackage = async (
  packageData: InsertPackage,
  itineraryData: ItineraryItem[],
  journeyDates: Date[],
) => {
  try {
    if (itineraryData.length === 0) {
      throw new Error("At least one itinerary item is required");
    }

    if (journeyDates.length === 0) {
      throw new Error("At least one journey date is required");
    }

    await db.transaction(async (tx) => {
      const [newPackage] = await tx
        .insert(packagesTable)
        .values({
          ...packageData,
          id: randomUUID(),
        })
        .returning({ id: packagesTable.id });

      if (!newPackage) {
        throw new Error("Failed inserting package");
      }

      const packageId = newPackage.id;

      // Insert itinerary
      await tx
        .insert(itineraryTable)
        .values(
          itineraryData.map((item) => ({
            packageId,
            day: item.day,
            description: item.description,
          })),
        )
        .catch((err) => {
          console.error("Error inserting itinerary:", err);
          throw new Error("Failed to insert itinerary");
        });

      // Insert travel dates
      await tx
        .insert(travelDatesTable)
        .values(
          journeyDates.map((date) => ({
            packageId,
            startDate: date.toISOString().split("T")[0],
          })),
        )
        .catch((err) => {
          console.error("Error inserting travel dates:", err);
          throw new Error("Failed to insert travel dates");
        });
    });

    revalidatePath("/admin/packages");
    revalidatePath("/packages");
  } catch (error) {
    console.error("Unknown Error::", error);
    throw new Error("Unknown Error"); // Let the caller handle the error (e.g., show toast)
  }
  // redirect("/admin/packages");
};

// * ADMIN PANEL

export const fetchPackagesFormAdmin = async ({
  page,
  pageSize = 20,
}: {
  page?: number;
  pageSize?: number;
}) => {
  try {
    const offset = page && page > 0 ? (page - 1) * pageSize : 0;

    const packages = await db
      .select({
        id: packagesTable.id,
        packageTitle: packagesTable.packageTitle,
        duration: packagesTable.duration,
        amountPerAdult: packagesTable.amountPerAdult,
        amountPerChild: packagesTable.amountPerChild,
      })
      .from(packagesTable)
      .limit(pageSize)
      .offset(offset);

    const packageIds = packages.map((pkg) => pkg.id);

    const travelDates = await db
      .select({
        startDate: travelDatesTable.startDate,
        packageId: travelDatesTable.packageId,
      })
      .from(travelDatesTable)
      .where(inArray(travelDatesTable.packageId, packageIds));
    // const packages = await db.query.

    const groupedDates = travelDates.reduce(
      (acc, curr) => {
        if (!acc[curr.packageId]) {
          acc[curr.packageId] = [];
        }
        acc[curr.packageId].push(curr.startDate);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    const result = packages.map((pkg) => ({
      ...pkg,
      availableDates: groupedDates[pkg.id] ?? [],
    }));

    return result;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages");
  }
};
