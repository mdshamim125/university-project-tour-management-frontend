/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  CalendarDays,
  DollarSign,
  ListChecks,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useGetAllToursQuery,
  useUpdateTourMutation,
} from "@/redux/features/tour/tour.api";

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: toursData, isFetching: loadingTours } = useGetAllToursQuery({
    page: "1",
    limit: "100",
  });

  const [updateTour] = useUpdateTourMutation();

  const [formValues, setFormValues] = useState<any>({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    costFrom: 0,
    maxGuest: 0,
    minAge: 0,
    included: [] as string[],
    excluded: [] as string[],
    amenities: [] as string[],
    tourPlan: [] as string[],
  });

  // Today's date in yyyy-MM-dd format for min attribute
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (toursData?.data && id) {
      const tour = toursData.data.find((t: any) => t._id === id);
      if (tour) {
        setFormValues({
          title: tour.title || "",
          location: tour.location || "",
          description: tour.description || "",
          startDate: tour.startDate ? tour.startDate.split("T")[0] : "",
          endDate: tour.endDate ? tour.endDate.split("T")[0] : "",
          costFrom: tour.costFrom || 0,
          maxGuest: tour.maxGuest || 0,
          minAge: tour.minAge || 0,
          included: tour.included || [],
          excluded: tour.excluded || [],
          amenities: tour.amenities || [],
          tourPlan: tour.tourPlan || [],
        });
      }
    }
  }, [toursData, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormValues((prev: any) => {
      const newArr = [...prev[field]];
      newArr[index] = value;
      return { ...prev, [field]: newArr };
    });
  };

  const addArrayItem = (field: string) => {
    setFormValues((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormValues((prev: any) => {
      const newArr = [...prev[field]];
      newArr.splice(index, 1);
      return { ...prev, [field]: newArr };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating tour...");

    try {
      // Convert number fields before sending
      const payload = {
        ...formValues,
        costFrom: formValues.costFrom ? Number(formValues.costFrom) : undefined,
        maxGuest: formValues.maxGuest ? Number(formValues.maxGuest) : undefined,
        minAge: formValues.minAge ? Number(formValues.minAge) : undefined,
      };

      const res = await updateTour({ id, ...payload }).unwrap();

      if (res.success) {
        toast.success("Tour updated successfully", { id: toastId });
        navigate("/admin/manage-tours");
      } else {
        toast.error(res.message || "Failed to update tour", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating tour", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (loadingTours) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-muted-foreground animate-pulse">
          Loading tour data...
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <Card className="border-none shadow-xl">
        <CardHeader className="pb-8 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight">
                Edit Tour Package
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                Update the details of this tour offering
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ─── Basic Information ─── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Basic Information
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Tour Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    placeholder="Enter tour title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formValues.location}
                    onChange={handleChange}
                    placeholder="e.g. Sylhet, Bangladesh"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Describe the tour experience, highlights, and inclusions..."
                  className="min-h-[140px]"
                />
              </div>
            </div>

            <Separator />

            {/* ─── Pricing & Capacity ─── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Pricing & Capacity
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="costFrom">Starting Price (BDT)</Label>
                  <Input
                    id="costFrom"
                    name="costFrom"
                    type="number"
                    min="0"
                    step="1"
                    value={formValues.costFrom}
                    onChange={handleChange}
                    placeholder="7500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGuest">Maximum Guests</Label>
                  <Input
                    id="maxGuest"
                    name="maxGuest"
                    type="number"
                    min="1"
                    step="1"
                    value={formValues.maxGuest}
                    onChange={handleChange}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minAge">Minimum Age</Label>
                  <Input
                    id="minAge"
                    name="minAge"
                    type="number"
                    min="0"
                    step="1"
                    value={formValues.minAge}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ─── Travel Period – PAST DATES PREVENTED ─── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Travel Period
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={today} // ← Prevents past dates
                    value={formValues.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    min={formValues.startDate || today} // ← Cannot be before start date
                    value={formValues.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ─── Dynamic Array Sections ─── */}
            {[
              {
                field: "included",
                title: "What's Included",
                icon: CheckCircle2,
              },
              { field: "excluded", title: "What's Excluded", icon: XCircle },
              { field: "amenities", title: "Amenities", icon: ListChecks },
              {
                field: "tourPlan",
                title: "Tour Plan / Itinerary",
                icon: CalendarDays,
              },
            ].map(({ field, title, icon: Icon }) => (
              <div key={field} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(field)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add {field === "tourPlan" ? "Day" : "Item"}
                  </Button>
                </div>

                <div className="space-y-3 rounded-lg border bg-card p-4">
                  {formValues[field].length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-6">
                      No items added yet
                    </p>
                  ) : (
                    formValues[field].map((item: string, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <Input
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(field, idx, e.target.value)
                            }
                            placeholder={`Enter ${field === "tourPlan" ? "day plan" : field} detail...`}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => removeArrayItem(field, idx)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

            {/* Submit Section */}
            <div className="flex justify-end gap-4 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/manage-tours")}
              >
                Cancel
              </Button>
              <Button type="submit" className="min-w-[140px]">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Plus, Minus } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   useGetAllToursQuery,
//   useUpdateTourMutation,
// } from "@/redux/features/tour/tour.api";

// export default function EditTour() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: toursData, isFetching: loadingTours } = useGetAllToursQuery({
//     page: "1",
//     limit: "100",
//   });
//   const [updateTour] = useUpdateTourMutation();

//   const [formValues, setFormValues] = useState<any>({
//     title: "",
//     location: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     costFrom: 0,
//     maxGuest: 0,
//     minAge: 0,
//     included: [] as string[],
//     excluded: [] as string[],
//     amenities: [] as string[],
//     tourPlan: [] as string[],
//   });

//   useEffect(() => {
//     if (toursData?.data && id) {
//       const tour = toursData.data.find((t: any) => t._id === id);
//       if (tour) {
//         setFormValues({
//           title: tour.title || "",
//           location: tour.location || "",
//           description: tour.description || "",
//           startDate: tour.startDate ? tour.startDate.split("T")[0] : "",
//           endDate: tour.endDate ? tour.endDate.split("T")[0] : "",
//           costFrom: tour.costFrom || 0,
//           maxGuest: tour.maxGuest || 0,
//           minAge: tour.minAge || 0,
//           included: tour.included || [],
//           excluded: tour.excluded || [],
//           amenities: tour.amenities || [],
//           tourPlan: tour.tourPlan || [],
//         });
//       }
//     }
//   }, [toursData, id]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormValues((prev: any) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (field: string, index: number, value: string) => {
//     setFormValues((prev: any) => {
//       const newArr = [...prev[field]];
//       newArr[index] = value;
//       return { ...prev, [field]: newArr };
//     });
//   };

//   const addArrayItem = (field: string) => {
//     setFormValues((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     setFormValues((prev: any) => {
//       const newArr = [...prev[field]];
//       newArr.splice(index, 1);
//       return { ...prev, [field]: newArr };
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const toastId = toast.loading("Updating tour..."); // move outside try to access in finally
//     try {
//       // Use RTK mutation with formValues only
//       const res = await updateTour({ id, ...formValues }).unwrap();

//       if (res.success) {
//         toast.success("Tour updated successfully", { id: toastId });
//         navigate("/admin/manage-tours");
//       } else {
//         toast.error(res.message || "Failed to update tour", { id: toastId });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating tour", { id: toastId });
//     } finally {
//       // Stop the loading toast in any case
//       toast.dismiss(toastId);
//     }
//   };

//   if (loadingTours) return <p>Loading tour data...</p>;

//   return (
//     <div className="w-full max-w-5xl mx-auto p-5">
//       <h1 className="text-xl font-semibold mb-6">Edit Tour</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <Input
//           name="title"
//           value={formValues.title}
//           onChange={handleChange}
//           placeholder="Tour Title"
//         />
//         <Input
//           name="location"
//           value={formValues.location}
//           onChange={handleChange}
//           placeholder="Location"
//         />
//         <Textarea
//           name="description"
//           value={formValues.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="border border-gray-300 rounded-md p-2 h-28"
//         />

//         {/* Dates & Cost */}
//         <div className="flex gap-3">
//           <Input
//             name="startDate"
//             type="date"
//             value={formValues.startDate}
//             onChange={handleChange}
//           />
//           <Input
//             name="endDate"
//             type="date"
//             value={formValues.endDate}
//             onChange={handleChange}
//           />
//           <Input
//             name="costFrom"
//             type="number"
//             value={formValues.costFrom}
//             onChange={handleChange}
//             placeholder="Cost"
//           />
//         </div>

//         <div className="flex gap-3">
//           <Input
//             name="maxGuest"
//             type="number"
//             value={formValues.maxGuest}
//             onChange={handleChange}
//             placeholder="Max Guests"
//           />
//           <Input
//             name="minAge"
//             type="number"
//             value={formValues.minAge}
//             onChange={handleChange}
//             placeholder="Minimum Age"
//           />
//         </div>

//         {/* Dynamic array fields */}
//         {["included", "excluded", "amenities", "tourPlan"].map((field) => (
//           <div key={field}>
//             <div className="flex justify-between items-center mb-2">
//               <p className="font-medium capitalize">{field}</p>
//               <Button
//                 type="button"
//                 onClick={() => addArrayItem(field)}
//                 size="icon"
//               >
//                 <Plus size={16} />
//               </Button>
//             </div>
//             {formValues[field].map((item: string, idx: number) => (
//               <div key={idx} className="flex gap-2 mb-2">
//                 <Input
//                   value={item}
//                   onChange={(e) =>
//                     handleArrayChange(field, idx, e.target.value)
//                   }
//                   placeholder={`Enter ${field} item`}
//                 />
//                 <Button
//                   type="button"
//                   onClick={() => removeArrayItem(field, idx)}
//                   size="icon"
//                 >
//                   <Minus size={16} />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ))}

//         <Button type="submit" className="mt-4">
//           Update Tour
//         </Button>
//       </form>
//     </div>
//   );
// }
