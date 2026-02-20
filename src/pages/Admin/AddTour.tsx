/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import type { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// ────────────────────────────────────────────────
//                  Zod Schema (Frontend)
// ────────────────────────────────────────────────
const formSchema = z
  .object({
    title: z.string().min(3, "Tour title must be at least 3 characters"),
    description: z.string().min(20, "Description should be more descriptive"),
    location: z.string().min(2, "Location is required"),
    costFrom: z
      .string()
      .min(1, "Price is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
    // ── Modern & correct way for required date ──
    startDate: z
      .date()
      .refine((val) => !!val, { message: "Start date is required" }),

    endDate: z
      .date()
      .refine((val) => !!val, { message: "End date is required" }),
    departureLocation: z.string().min(2, "Departure location is required"),
    arrivalLocation: z.string().min(2, "Arrival location is required"),
    included: z.array(
      z.object({ value: z.string().min(1, "Cannot be empty") }),
    ),
    excluded: z.array(
      z.object({ value: z.string().min(1, "Cannot be empty") }),
    ),
    amenities: z.array(
      z.object({ value: z.string().min(1, "Cannot be empty") }),
    ),
    tourPlan: z.array(
      z.object({ value: z.string().min(1, "Cannot be empty") }),
    ),
    maxGuest: z
      .string()
      .min(1, "Maximum guests is required")
      .regex(/^\d+$/, "Must be a whole number"),
    minAge: z
      .string()
      .min(1, "Minimum age is required")
      .regex(/^\d+$/, "Must be a whole number"),
    division: z.string().min(1, "Please select a division"),
    tourType: z.string().min(1, "Please select a tour type"),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function AddTour() {
  const [images, setImages] = useState<(File | any)[]>([]);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const [addTour, { isLoading: isSubmitting }] = useAddTourMutation();

  const divisionOptions =
    divisionData?.data?.map((item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })) ?? [];

  const tourTypeOptions =
    tourTypeData?.data?.map((item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })) ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      costFrom: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      departureLocation: "",
      arrivalLocation: "",
      included: [{ value: "Accommodation" }, { value: "Professional guide" }],
      excluded: [{ value: "Personal expenses" }, { value: "Travel insurance" }],
      amenities: [{ value: "Air conditioning" }, { value: "Wi-Fi" }],
      tourPlan: [
        { value: "Day 1: Arrival & welcome" },
        { value: "Day 2: Main activities" },
      ],
      maxGuest: "",
      minAge: "",
      division: "",
      tourType: "",
    },
    mode: "onChange",
  });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control: form.control, name: "included" });

  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control: form.control, name: "excluded" });

  const {
    fields: amenitiesFields,
    append: appendAmenities,
    remove: removeAmenities,
  } = useFieldArray({ control: form.control, name: "amenities" });

  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({ control: form.control, name: "tourPlan" });

  const safeNumber = (value: string): number | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const num = Number(trimmed);
    return isNaN(num) ? undefined : num;
  };

  const onSubmit = async (values: FormValues) => {
    if (images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    const toastId = toast.loading("Creating tour...");

    const payload: any = {
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      location: values.location.trim() || undefined,
      departureLocation: values.departureLocation.trim() || undefined,
      arrivalLocation: values.arrivalLocation.trim() || undefined,

      // ── Critical fix: empty string → undefined ──
      costFrom: safeNumber(values.costFrom),
      maxGuest: safeNumber(values.maxGuest),
      minAge: safeNumber(values.minAge),

      startDate: formatISO(values.startDate),
      endDate: formatISO(values.endDate),

      division: values.division,
      tourType: values.tourType,

      included: values.included.map((i) => i.value.trim()).filter(Boolean),
      excluded: values.excluded.map((i) => i.value.trim()).filter(Boolean),
      amenities: values.amenities.map((i) => i.value.trim()).filter(Boolean),
      tourPlan: values.tourPlan.map((i) => i.value.trim()).filter(Boolean),
    };

    // Optional: debug what is actually being sent
    // console.log("Payload being sent:", payload);

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    images.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      }
    });

    try {
      const res = await addTour(formData).unwrap();

      if (res?.success) {
        toast.success("Tour created successfully", { id: toastId });
        form.reset();
        setImages([]);
      } else {
        toast.error(res?.message || "Failed to create tour", { id: toastId });
      }
    } catch (err: unknown) {
      const error = err as IErrorResponse;
      toast.error(error?.message || "Something went wrong", { id: toastId });
      console.error("Tour creation error:", err);
    }
  };

  return (
    <div className="container max-w-5xl py-10 mx-auto">
      <Card className="border-t-4 border-primary/30 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create New Tour Package
          </CardTitle>
          <CardDescription className="text-base">
            Fill in the details to add a new tour to the catalog
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10"
              noValidate
            >
              {/* ─── Basic Information ─── */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  Basic Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Cox's Bazar Beach Escape"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Location *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Cox's Bazar, Sylhet"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the tour experience, highlights, target audience..."
                          className="min-h-[140px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* ─── Pricing & Capacity ─── */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  Pricing & Capacity
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="costFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price From (BDT) *</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="6500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxGuest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Guests *</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Age *</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ─── Dates & Locations ─── */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  Travel Period & Locations
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Pick date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Pick date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departureLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Dhaka" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="arrivalLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cox's Bazar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={divisionLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisionOptions.map((opt: any) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tourType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={tourTypeLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tourTypeOptions.map((opt: any) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ─── Images ─── */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  Tour Gallery
                </h3>
                <div
                  className={cn(
                    "rounded-lg border-2 border-dashed p-6 transition-colors",
                    images.length === 0 &&
                      "border-destructive/50 bg-destructive/5",
                  )}
                >
                  <MultipleImageUploader onChange={setImages} />
                  {images.length === 0 && form.formState.isSubmitted && (
                    <p className="mt-2 text-sm text-destructive text-center">
                      Please upload at least one tour image
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* ─── Arrays ─── */}
              {[
                {
                  title: "What's Included",
                  fields: includedFields,
                  append: appendIncluded,
                  remove: removeIncluded,
                  name: "included",
                },
                {
                  title: "What's Excluded",
                  fields: excludedFields,
                  append: appendExcluded,
                  remove: removeExcluded,
                  name: "excluded",
                },
                {
                  title: "Amenities",
                  fields: amenitiesFields,
                  append: appendAmenities,
                  remove: removeAmenities,
                  name: "amenities",
                },
                {
                  title: "Day-by-Day Plan",
                  fields: tourPlanFields,
                  append: appendTourPlan,
                  remove: removeTourPlan,
                  name: "tourPlan",
                },
              ].map(({ title, fields, append, remove, name }) => (
                <div key={name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {title}
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ value: "" })}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-3 items-start">
                        <FormField
                          control={form.control}
                          name={
                            `${name}.${index}.value` as
                              | `included.${number}.value`
                              | `excluded.${number}.value`
                              | `amenities.${number}.value`
                              | `tourPlan.${number}.value`
                          }
                          render={({ field: inputField }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder={
                                    name === "tourPlan"
                                      ? "Day 1: Description of activities..."
                                      : "Enter detail..."
                                  }
                                  {...inputField}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 mt-1"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-8 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="px-10"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? "Creating Tour..." : "Create Tour Package"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
