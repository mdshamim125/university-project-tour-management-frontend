/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddTourTypeMutation } from "@/redux/features/auth/tour/tour.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddTourTypeModal() {
  const form = useForm();
  const [addTourType] = useAddTourTypeMutation();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const res = await addTourType({ name: data.name }).unwrap();
      if (res.success) {
        toast.success("Tour Type Added");
        form.reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus size={18} /> 
            Add Tour Type
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Type Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tour Type Name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-tour-type">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
