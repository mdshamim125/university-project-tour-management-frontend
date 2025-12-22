/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    const toastId = toast.loading("Updating tour..."); // move outside try to access in finally
    try {
      // Use RTK mutation with formValues only
      const res = await updateTour({ id, ...formValues }).unwrap();

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
      // Stop the loading toast in any case
      toast.dismiss(toastId);
    }
  };

  if (loadingTours) return <p>Loading tour data...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto p-5">
      <h1 className="text-xl font-semibold mb-6">Edit Tour</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Tour Title"
        />
        <Input
          name="location"
          value={formValues.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <Textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2 h-28"
        />

        {/* Dates & Cost */}
        <div className="flex gap-3">
          <Input
            name="startDate"
            type="date"
            value={formValues.startDate}
            onChange={handleChange}
          />
          <Input
            name="endDate"
            type="date"
            value={formValues.endDate}
            onChange={handleChange}
          />
          <Input
            name="costFrom"
            type="number"
            value={formValues.costFrom}
            onChange={handleChange}
            placeholder="Cost"
          />
        </div>

        <div className="flex gap-3">
          <Input
            name="maxGuest"
            type="number"
            value={formValues.maxGuest}
            onChange={handleChange}
            placeholder="Max Guests"
          />
          <Input
            name="minAge"
            type="number"
            value={formValues.minAge}
            onChange={handleChange}
            placeholder="Minimum Age"
          />
        </div>

        {/* Dynamic array fields */}
        {["included", "excluded", "amenities", "tourPlan"].map((field) => (
          <div key={field}>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium capitalize">{field}</p>
              <Button
                type="button"
                onClick={() => addArrayItem(field)}
                size="icon"
              >
                <Plus size={16} />
              </Button>
            </div>
            {formValues[field].map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(field, idx, e.target.value)
                  }
                  placeholder={`Enter ${field} item`}
                />
                <Button
                  type="button"
                  onClick={() => removeArrayItem(field, idx)}
                  size="icon"
                >
                  <Minus size={16} />
                </Button>
              </div>
            ))}
          </div>
        ))}

        <Button type="submit" className="mt-4">
          Update Tour
        </Button>
      </form>
    </div>
  );
}
