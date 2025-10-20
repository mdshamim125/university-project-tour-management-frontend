/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addDivision] = useAddDivisionMutation();
  const [loading, setLoading] = useState(false);

  console.log("Inside add division modal", image);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    // console.log(formData.get("file"));

    try {
      const res = await addDivision(formData).unwrap();
      console.log(res);
      toast.success("Division Added");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add division");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2">
          <Plus size={18} />
          Add Division
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <SingleImageUploader onChange={setImage} />
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!image} type="submit" form="add-division">
            {loading ? "Adding..." : "Add Division"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
