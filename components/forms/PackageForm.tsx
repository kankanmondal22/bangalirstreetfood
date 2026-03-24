"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  Resolver,
  // useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { XIcon, PlusIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, startOfDay } from "date-fns";
import { IPackageFrom, packageFormSchema } from "@/types/package";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { createPackage } from "@/actions/package.action";
import { InsertPackage } from "@/db/schema";
import { useRouter } from "next/navigation";

type TourFormProps = {
  tour?: {
    id: string;
    title: string;
    description: string;
  };
};

export function TourForm({ tour }: TourFormProps) {
  const router = useRouter();

  const form = useForm<IPackageFrom>({
    resolver: zodResolver(packageFormSchema) as Resolver<IPackageFrom>,
    defaultValues: {
      highlights: [],
      itinerary: [{ day: 1, description: "Pick up" }],
      images: [],
      amountAdult: 0,
      amountChild: 0,
      minBookingAmount: 0,
      maxGroupSize: 0,
      journeyDates: [],
      description: "",
      duration: "",
      title: "",
    },
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const itinerary = useWatch({
    control: form.control,
    name: "itinerary",
  });

  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  function handleImageUpload(files: FileList | null) {
    if (!files) return;
    const fileArray = Array.from(files);
    form.setValue("images", fileArray);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  }

  async function onSubmit(data: IPackageFrom) {
    const parsedData: InsertPackage = {
      ...data,
      packageTitle: data.title,
      packageDescription: data.description,
      amountPerAdult: data.amountAdult,
      amountPerChild: data.amountChild,
      minimumBookingAmountPerPerson: data.minBookingAmount,
      maxGroupSize: data.maxGroupSize,
      duration: data.duration,
      highlights: data.highlights,
      // itinerary: data.itinerary,
    };

    await createPackage(parsedData, data.itinerary, data.journeyDates)
      .then(() => {
        toast.success("Tour Created");
        form.reset();
        // redirect
        router.push("/admin/packages");
      })
      .catch((err) => {
        toast.error("Failed to create tour: " + err.message);
      });
  }

  return (
    <Card className="border-t-primary mx-auto w-full max-w-3xl border-t-4 shadow-lg">
      <CardHeader className="bg-muted/40 border-b pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create Tour Package
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Add tour details including pricing, highlights and itinerary.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="tour-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="">
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <FieldContent>
                    <Input {...field} placeholder="Amazing Bali Trip" />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <FieldContent>
                    <Textarea {...field} placeholder="Tour details..." />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="journeyDates"
              control={form.control}
              render={({ field, fieldState }) => {
                const dates = field.value || [];

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Departure Dates</FieldLabel>

                    <FieldContent>
                      <div className="flex flex-wrap gap-2">
                        {/* Existing Date Badges */}
                        {dates.map((date: Date, index: number) => (
                          <Badge
                            key={index}
                            variant="default"
                            className="flex items-center gap-2 pr-1"
                          >
                            {format(date, "PPP")}

                            <button
                              type="button"
                              onClick={() => {
                                const updated = dates.filter(
                                  (_: Date, i: number) => i !== index,
                                );
                                field.onChange(updated);
                              }}
                              className="ml-1"
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}

                        {/* Add Button Badge */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge
                              variant="success"
                              className="flex cursor-pointer items-center gap-1"
                            >
                              <PlusIcon className="h-3 w-3" />
                              Add
                            </Badge>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              startMonth={new Date(2026, 0)}
                              endMonth={new Date(2036, 0)}
                              mode="multiple"
                              selected={dates}
                              captionLayout="dropdown"
                              onSelect={(selected) => {
                                if (!selected) return;
                                const normalized = selected.map((date) =>
                                  startOfDay(date),
                                );
                                field.onChange(normalized);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FieldContent>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Duration */}
            <Controller
              name="duration"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Duration</FieldLabel>
                  <FieldContent>
                    <Input {...field} placeholder="3 Nights 4 Days" />
                  </FieldContent>
                </Field>
              )}
            />

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-amber-200/60 bg-amber-50/40 p-4 dark:border-amber-800/30 dark:bg-amber-950/20">
              <Controller
                name="amountAdult"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Amount per Adult</FieldLabel>
                    <FieldContent>
                      <Input type="number" required {...field} />
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="amountChild"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Amount per Child</FieldLabel>
                    <FieldContent>
                      <Input type="number" required {...field} />
                    </FieldContent>
                  </Field>
                )}
              />
            </div>

            {/* Min booking + max group */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-sky-200/60 bg-sky-50/40 p-4 dark:border-sky-800/30 dark:bg-sky-950/20">
              <Controller
                name="minBookingAmount"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Minimum Booking Amount</FieldLabel>
                    <FieldContent>
                      <Input type="number" {...field} />
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="maxGroupSize"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Max Group Size</FieldLabel>
                    <FieldContent>
                      <Input type="number" {...field} />
                    </FieldContent>
                  </Field>
                )}
              />
            </div>

            {/* Highlights Array */}
            <FieldSet className="bg-muted/20 border-border rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <FieldLegend className="text-primary text-xs font-semibold tracking-wide uppercase">
                  Highlights
                </FieldLegend>
                <AddHighlightDialog form={form} />
              </div>

              <div className="border-border flex flex-col overflow-hidden rounded-md border">
                {highlights.length === 0 && (
                  <p className="text-muted-foreground py-6 text-center text-sm italic">
                    No highlights yet
                  </p>
                )}
                {highlights.map((item, index) => (
                  <ul
                    key={index}
                    className="hover:bg-accent/50 border-border flex w-full list-inside list-disc items-center justify-between gap-1 border-b py-2 pl-3 last:border-b-0"
                  >
                    <li className="text-foreground font-medium">{item}</li>
                    <Button
                      variant={"destructive"}
                      type="button"
                      onClick={() => {
                        const updated = highlights.filter(
                          (_, i) => i !== index,
                        );
                        form.setValue("highlights", updated, {
                          shouldValidate: true,
                        });
                      }}
                      className="text-muted-foreground hover:text-foreground ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </ul>
                ))}
              </div>

              {form.formState.errors.highlights && (
                <FieldError errors={[form.formState.errors.highlights]} />
              )}
            </FieldSet>
            {/* Itinerary Array */}
            <FieldSet className="bg-muted/20 border-border rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <FieldLegend className="text-primary text-xs font-semibold tracking-wide uppercase">
                  Itinerary
                </FieldLegend>
                <FieldDescription>
                  <AddItineraryDialog form={form} />
                </FieldDescription>
              </div>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-primary/10 border-primary/20 border-b">
                    <tr>
                      <th className="text-primary px-4 py-3 text-left font-semibold">
                        Day
                      </th>
                      <th className="text-primary px-4 py-3 text-left font-semibold">
                        Description
                      </th>
                      <th className="text-primary px-4 py-3 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {itinerary.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-muted-foreground px-4 py-8 text-center text-sm italic"
                        >
                          No itinerary added yet
                        </td>
                      </tr>
                    )}
                    {itinerary.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-3 font-medium">{item.day}</td>

                        <td className="text-muted-foreground px-4 py-3">
                          <span className="line-clamp-2">
                            {item.description}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <EditItineraryDialog
                              form={form}
                              index={index}
                              defaultValue={item}
                            />

                            <Button
                              type="button"
                              size="icon-sm"
                              variant="destructive"
                              onClick={() => {
                                const updated = itinerary.filter(
                                  (_, i) => i !== index,
                                );
                                form.setValue("itinerary", updated, {
                                  shouldValidate: true,
                                });
                              }}
                            >
                              ✕
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {form.formState.errors.itinerary && (
                <FieldError errors={[form.formState.errors.itinerary]} />
              )}
            </FieldSet>
            {/* Image Upload */}
            <Field>
              <FieldLabel>Upload Images</FieldLabel>
              <FieldContent>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {previewImages.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt="preview"
                      width={120}
                      height={120}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </FieldContent>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="bg-muted/40 border-t pt-6">
        <Button
          type="submit"
          form="tour-form"
          size="lg"
          className="w-full font-semibold tracking-wide"
        >
          Create Tour
        </Button>
      </CardFooter>
    </Card>
  );
}

function AddHighlightDialog({ form }: { form: UseFormReturn<IPackageFrom> }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const highlights = form.watch("highlights");

  function handleAdd() {
    if (!value.trim()) return;

    form.setValue("highlights", [...highlights, value.trim()], {
      shouldValidate: true,
    });

    setValue("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="success">
          + Add
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Highlight</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="e.g. Beach sunset cruise"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddItineraryDialog({
  form,
  day,
}: {
  form: UseFormReturn<IPackageFrom>;
  day?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [dayValue, setDayValue] = React.useState(day || 0);
  const [description, setDescription] = React.useState("");

  const itinerary = form.watch("itinerary");

  function handleAdd() {
    if (!dayValue || !description.trim()) return;

    form.setValue(
      "itinerary",
      [...itinerary, { day: dayValue, description: description.trim() }],
      { shouldValidate: true },
    );

    setDayValue(0);
    setDescription("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="success" size="sm">
          + Add
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Itinerary Day</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Day 1"
            value={dayValue}
            onChange={(e) => setDayValue(parseInt(e.target.value) || 0)}
          />

          <Textarea
            placeholder="Describe the day's activities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditItineraryDialog({
  form,
  index,
  defaultValue,
}: {
  form: UseFormReturn<IPackageFrom>;
  index: number;
  defaultValue: { day: number; description: string };
}) {
  const [open, setOpen] = React.useState(false);
  const [day, setDay] = React.useState(defaultValue.day);
  const [description, setDescription] = React.useState(
    defaultValue.description,
  );

  const itinerary = form.watch("itinerary");

  function handleSave() {
    const updated = [...itinerary];
    updated[index] = { day: day, description: description.trim() };

    form.setValue("itinerary", updated, { shouldValidate: true });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Itinerary</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={day} onChange={(e) => setDay(e.target.valueAsNumber)} />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
