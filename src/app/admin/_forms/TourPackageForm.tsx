/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createTourPackage } from "../_actions/tours";

export const itinerarySchema = z.object({
  day: z.coerce.number().min(1, "Day must be at least 1"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const journeyDateSchema = z
  .object({
    startDate: z.coerce.date({ message: "Start date is required" }),
    endDate: z.coerce.date({ message: "End date is required" }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const tourPackageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  days: z.coerce.number().min(1, "Must be at least 1 day").optional(),
  adultPrice: z.coerce.number().min(0, "Price must be non-negative").optional(),
  childPrice: z.coerce.number().min(0, "Price must be non-negative").optional(),
  itinerary: z.array(itinerarySchema).optional(),
  foodingAndLodging: z.string().optional(),
  journeyDates: z.array(journeyDateSchema).optional(),
  images: z.custom<FileList>().optional(),
  pickupAt: z.string().optional(),
  dropAt: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const editTourPackageSchema = tourPackageSchema.extend({
  id: z.string(),
});

export type TourPackageData = z.infer<typeof tourPackageSchema>;
export type CreateTourPackageData = z.infer<typeof tourPackageSchema>;
export type EditTourPackageData = z.infer<typeof editTourPackageSchema>;

export default function TourPackageForm({
  tourPackageData,
}: {
  tourPackageData?: EditTourPackageData;
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(tourPackageSchema),
    defaultValues: {
      title: tourPackageData?.title || "",
      slug: tourPackageData?.slug || "",
      description: tourPackageData?.description || "",
      days: tourPackageData?.days || 1,
      adultPrice: tourPackageData?.adultPrice || 0,
      childPrice: tourPackageData?.childPrice || 0,
      itinerary: tourPackageData?.itinerary || [],
      foodingAndLodging: tourPackageData?.foodingAndLodging || "",
      journeyDates: tourPackageData?.journeyDates || [],
      pickupAt: tourPackageData?.pickupAt || "",
      dropAt: tourPackageData?.dropAt || "",
      isActive: tourPackageData?.isActive ?? true,
    },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({ control, name: "itinerary" });

  const {
    fields: journeyFields,
    append: appendJourney,
    remove: removeJourney,
  } = useFieldArray({ control, name: "journeyDates" });

  const titleValue = watch("title");
  const daysValue = watch("days");

  useEffect(() => {
    const count = Number(daysValue);
    if (!count || count < 1) return;

    const current = itineraryFields.length;

    if (count > current) {
      for (let i = current + 1; i <= count; i++) {
        appendItinerary(
          { day: i, title: "", description: "" },
          { shouldFocus: false },
        );
      }
    } else if (count < current) {
      for (let i = current - 1; i >= count; i--) {
        removeItinerary(i);
      }
    }
  }, [daysValue]);

  const onSubmit = async (formData: any) => {
    const parsed = tourPackageSchema.safeParse(formData);
    if (!parsed.success) {
      console.error("Form data validation errors:", parsed.error.issues);
      return;
    }
    // Strip FileList — file upload handled separately
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, ...payload } = parsed.data;
    await createTourPackage(payload as CreateTourPackageData)
      .then(() => {
        alert("Tour package created successfully!");
      })
      .catch((error) => {
        alert("Failed to create tour package: " + error.message);
      });
  };

  return (
    <div className="max-w-4xl">
      <h2 className="page-heading">
        {tourPackageData ? "Edit Tour Package" : "New Tour Package"}
      </h2>

      <div className="admin-card">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-1">
          {/* BASIC INFO */}
          <div>
            <h3 className="admin-page-title mb-4">Basic Information</h3>

            <div className="admin-form-group">
              <label>Title</label>
              <input
                {...register("title")}
                placeholder="Golden Triangle Explorer"
              />
              <p className="admin-error-text">{errors.title?.message}</p>
            </div>

            <div className="admin-form-group">
              <label>Description</label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe the tour package..."
              />
              <p className="admin-error-text">{errors.description?.message}</p>
            </div>

            <div className="sr-only">
              <input {...register("slug")} readOnly />
            </div>
          </div>

          <div className="admin-divider" />

          {/* PRICING & DURATION */}
          <div>
            <h3 className="admin-page-title mb-4">Pricing & Duration</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="admin-form-group">
                <label>Duration (Days)</label>
                <input {...register("days")} type="number" min="1" />
                <p className="admin-error-text">{errors.days?.message}</p>
              </div>

              <div className="admin-form-group">
                <label>Adult Price (₹)</label>
                <input {...register("adultPrice")} type="number" />
                <p className="admin-error-text">{errors.adultPrice?.message}</p>
              </div>

              <div className="admin-form-group">
                <label>Child Price (₹)</label>
                <input {...register("childPrice")} type="number" />
                <p className="admin-error-text">{errors.childPrice?.message}</p>
              </div>
            </div>
          </div>

          <div className="admin-divider" />

          {/* LOCATIONS */}
          <div>
            <h3 className="admin-page-title mb-4">Locations</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="admin-form-group">
                <label>Pickup Location</label>
                <input {...register("pickupAt")} />
                <p className="admin-error-text">{errors.pickupAt?.message}</p>
              </div>

              <div className="admin-form-group">
                <label>Drop Location</label>
                <input {...register("dropAt")} />
                <p className="admin-error-text">{errors.dropAt?.message}</p>
              </div>
            </div>
          </div>

          <div className="admin-divider" />

          {/* JOURNEY DATES */}
          <div>
            <h3 className="admin-page-title mb-4">Journey Dates</h3>

            <div className="space-y-4">
              {journeyFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label>Start Date</label>
                      <input
                        {...register(`journeyDates.${index}.startDate`)}
                        type="date"
                      />
                      <p className="admin-error-text">
                        {errors.journeyDates?.[index]?.startDate?.message}
                      </p>
                    </div>

                    <div>
                      <label>End Date</label>
                      <input
                        {...register(`journeyDates.${index}.endDate`)}
                        type="date"
                      />
                      <p className="admin-error-text">
                        {errors.journeyDates?.[index]?.endDate?.message}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 text-sm text-red-600 hover:underline"
                    onClick={() => removeJourney(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="add-button"
                onClick={() => appendJourney({ startDate: "", endDate: "" })}
              >
                Add Journey Date
              </button>
            </div>
          </div>

          <div className="admin-divider" />

          {/* ITINERARY */}
          <div>
            <h3 className="admin-page-title mb-4">Itinerary</h3>

            <div className="space-y-4">
              {itineraryFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg "
                >
                  <div className="flex gap-4 items-start">
                    <strong className="block mb-2">Day {index + 1} :</strong>
                    <input
                      type="hidden"
                      {...register(`itinerary.${index}.day`)}
                      value={index + 1}
                    />

                    <div className="admin-form-group grow">
                      <label className="sr-only">Title</label>
                      <input {...register(`itinerary.${index}.title`)} />
                      <p className="admin-error-text">
                        {errors.itinerary?.[index]?.title?.message}
                      </p>
                    </div>
                  </div>
                  <div className="admin-form-group  md:col-span-2">
                    <label>Description</label>
                    <textarea
                      className="max-w-md"
                      {...register(`itinerary.${index}.description`)}
                    />
                    <p className="admin-error-text">
                      {errors.itinerary?.[index]?.description?.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-divider" />

          {/* OTHER */}
          <div>
            <h3 className="admin-page-title mb-4">Other Details</h3>

            <div className="admin-form-group">
              <label>Fooding & Lodging</label>
              <textarea {...register("foodingAndLodging")} />
            </div>

            <div className="admin-form-group">
              <label>Images</label>
              <input {...register("images")} type="file" multiple />
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isActive")} />
              Active package
            </label>
          </div>

          <div className="admin-divider" />

          {/* SUBMIT */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="add-button"
            >
              {isSubmitting
                ? "Saving..."
                : tourPackageData
                  ? "Update Package"
                  : "Create Package"}
            </button>

            {isDirty && !isSubmitting && (
              <span className="text-sm text-gray-500">Unsaved changes</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
