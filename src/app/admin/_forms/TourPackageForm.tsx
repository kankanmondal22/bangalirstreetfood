/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTourPackage,
  fetchTourPackage,
  updateTourPackage,
} from "../_actions/package";

import z from "zod";

export const itinerarySchema = z.object({
  day: z.coerce.number().min(1, "Day must be at least 1"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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
  images: z.array(z.string().url("Must be a valid URL")).optional(),
  isActive: z.boolean().optional(),
});

export type TourPackageData = z.infer<typeof tourPackageSchema>;
export type CreateTourPackageData = Omit<TourPackageData, "slug">;
// ─── Main Component ───────────────────────────────────────────────────────────

export default function TourPackageForm({
  tourPackageId,
  onSuccess,
}: {
  tourPackageId?: string;
  onSuccess?: (data: unknown) => void;
}) {
  const isEditMode = Boolean(tourPackageId);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  ); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState("");
  const [imageinput, setImageinput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(tourPackageSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      days: "",
      adultPrice: "",
      childPrice: "",
      itinerary: [],
      foodingAndLodging: "",
      images: [],
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const images = watch("images") || [];

  // Load existing data in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    async function loadData() {
      try {
        if (!tourPackageId)
          throw new Error("Tour package ID is required for editing.");
        const data = await fetchTourPackage(tourPackageId);
        reset(data);
      } catch (err: any) {
        setSubmitStatus("error");
        setSubmitMessage(err.message || "Failed to load tour package data.");
      }
    }
    loadData();
  }, [tourPackageId, isEditMode, reset]);

  const onSubmit = async (formData: any) => {
    setSubmitStatus(null);
    try {
      let result;

      if (isEditMode) {
        if (!tourPackageId)
          throw new Error("Tour package ID is required for editing.");

        result = await updateTourPackage(tourPackageId, formData);
      } else {
        result = await createTourPackage(formData);
      }
      setSubmitStatus("success");
      setSubmitMessage(
        isEditMode
          ? "Tour package updated successfully!"
          : "Tour package created successfully!",
      );
      if (!isEditMode) reset();
      if (onSuccess) onSuccess(result);
    } catch (err: any) {
      setSubmitStatus("error");
      setSubmitMessage(
        err.message || "Something went wrong. Please try again.",
      );
    }
  };

  const addImage = () => {
    const trimmed = imageinput.trim();
    if (!trimmed) return;
    setValue("images", [...images, trimmed], { shouldDirty: true });
    setImageinput("");
  };

  const removeImage = (idx: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== idx),
      { shouldDirty: true },
    );
  };

  return (
    <div className="min-h-screen  p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-linear-to-b from-teal-400 to-teal-600 rounded-full" />
            <h1 className="text-2xl font-bold text-teal-700 tracking-tight">
              {isEditMode ? "Edit Tour Package" : "New Tour Package"}
            </h1>
          </div>
          <p className="text-teal-800/70 text-sm ml-4">
            {isEditMode
              ? "Update the details of your tour package"
              : "Fill in the details to create a new tour package"}
          </p>
        </div>

        {/* Status Banner */}
        {submitStatus && (
          <div
            className={`mb-6 px-4 py-3  text-sm font-medium border-2 ${
              submitStatus === "success"
                ? "bg-teal-500/10 border-teal-500/30 text-teal-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {submitStatus === "success" ? "✓ " : "✕ "}
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Card: Basic Info */}
          <section className="border-2 border-teal-800/40  p-6 backdrop-blur-sm">
            <h2 className="text-sm font-bold text-teal-800 uppercase tracking-widest mb-5">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label>Title</label>
                <input
                  required
                  {...register("title")}
                  placeholder="e.g. Golden Triangle Explorer"
                />
                <p>{errors.title?.message} </p>
              </div>

              <div>
                <label>Slug</label>
                <input
                  {...register("slug")}
                  placeholder="golden-triangle-explorer"
                />
                <p>{errors.slug?.message} </p>
              </div>

              <div>
                <label>Duration (Days)</label>
                <input
                  {...register("days")}
                  type="number"
                  min="1"
                  placeholder="7"
                />
                <p>{errors.days?.message} </p>
              </div>

              <div className="md:col-span-2">
                <label>Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Describe the tour package..."
                  rows={4}
                />
                <p>{errors.description?.message}</p>
              </div>
            </div>
          </section>

          {/* Card: Pricing */}
          <section className="order border-teal-800/40  p-6 backdrop-blur-sm">
            <h2 className="text-sm font-bold text-teal-800 uppercase tracking-widest mb-5">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label>Adult Price (₹)</label>
                <input
                  {...register("adultPrice")}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="12999"
                />
                <p>{errors.adultPrice?.message} </p>
              </div>
              <div>
                <label>Child Price (₹)</label>
                <input
                  {...register("childPrice")}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="7999"
                />
                <p>{errors.childPrice?.message} </p>
              </div>
            </div>
          </section>

          {/* Card: Itinerary */}
          <section className=" border-2 border-teal-800/40  p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-teal-800 uppercase tracking-widest">
                Itinerary
              </h2>
              <button
                type="button"
                onClick={() =>
                  append({ day: fields.length + 1, title: "", description: "" })
                }
                className="flex items-center gap-1.5 bg-teal-500/15 hover:bg-teal-500/25 border-2 border-teal-500/30
                  text-teal-600 text-xs font-semibold px-3 py-1.5  transition-all duration-200"
              >
                <span className="text-base leading-none">+</span> Add Day
              </button>
            </div>

            {fields.length === 0 && (
              <p className="text-teal-600 text-sm text-center py-6 border-2 border-dashed border-teal-800/50 ">
                No itinerary added yet. Click "Add Day" to get started.
              </p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-teal-50/50 border-2 border-teal-800/30  p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-teal-500 uppercase tracking-widest">
                      Day {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label>Day #</label>
                      <input
                        {...register(`itinerary.${index}.day`)}
                        type="number"
                        min="1"
                        placeholder="1"
                      />
                      <p>{errors.itinerary?.[index]?.day?.message}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label>Title</label>
                      <input
                        {...register(`itinerary.${index}.title`)}
                        placeholder="Arrival & City Tour"
                      />
                      <p>{errors.itinerary?.[index]?.title?.message}</p>
                    </div>
                    <div className="md:col-span-3">
                      <label>Description</label>
                      <textarea
                        {...register(`itinerary.${index}.description`)}
                        placeholder="What happens on this day..."
                      />
                      <p>{errors.itinerary?.[index]?.description?.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Card: Accommodation & Images */}
          <section className=" border-2 border-teal-800/40  p-6 backdrop-blur-sm">
            <h2 className="text-sm font-bold text-teal-800 uppercase tracking-widest mb-5">
              Accommodation & Media
            </h2>
            <div className="space-y-5">
              <div>
                <label>Fooding & Lodging</label>
                <textarea
                  {...register("foodingAndLodging")}
                  placeholder="e.g. Breakfast included, 3-star hotels..."
                />
                <p>{errors.foodingAndLodging?.message} </p>
              </div>

              {/* Image URLs */}
              <div>
                <label>Image URLs</label>
                <div className="flex gap-2">
                  <input
                    value={imageinput}
                    onChange={(e) => setImageinput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImage();
                      }
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold
                      px-4 py-2.5  transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                {errors.images && (
                  <p className="text-red-400 text-xs mt-1">
                    One or more URLs are invalid
                  </p>
                )}
                {images.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {images.map((url, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 bg-teal-950/60
                          border-2 border-teal-800/30  px-3 py-2"
                      >
                        <span className="text-xs text-teal-300 truncate">
                          {url}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="shrink-0 text-red-400/60 hover:text-red-400 text-xs transition-colors"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Card: Settings */}
          <section className=" border-2 border-teal-800/40  p-6 backdrop-blur-sm">
            <h2 className="text-sm font-bold text-teal-800 uppercase tracking-widest mb-4">
              Settings
            </h2>
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 rounded border-teal-600 bg-teal-950 text-teal-500
                  focus:ring-teal-400 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-teal-800">
                Active (visible to customers)
              </span>
            </label>
          </section>

          {/* Submit */}
          <div className="flex items-center gap-4 pb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-none md:min-w-[180px] bg-teal-500 hover:bg-teal-400
                disabled:bg-teal-800 disabled:text-teal-600 disabled:cursor-not-allowed
                text-white font-bold py-3 px-8  transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-950"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Package"
                  : "Create Package"}
            </button>
            {isDirty && !isSubmitting && (
              <span className="text-xs text-teal-500">Unsaved changes</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
