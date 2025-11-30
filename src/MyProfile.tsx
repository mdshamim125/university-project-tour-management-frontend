/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "./redux/features/user/user.api";

const formSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  oldPassword: z.string().optional(),
  password: z.string().optional(),
});

export default function MyProfile() {
  const { data: profileInfo, refetch } = useUserInfoQuery(null);
  const [updateProfile] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      oldPassword: "",
      password: "",
    },
  });

  // Load user info into form
  useEffect(() => {
    if (profileInfo?.data) {
      form.reset({
        name: profileInfo.data.name,
        phone: profileInfo.data.phone,
        address: profileInfo.data.address || "",
        oldPassword: "",
        password: "",
      });
    }
  }, [profileInfo, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const changed: any = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== profileInfo?.data?.[key]) {
        changed[key] = value;
      }
    });

    if (values.password && !values.oldPassword) {
      toast.error("Enter your old password to set a new one");
      return;
    }
    if (values.oldPassword && !values.password) {
      toast.error("Enter a new password");
      return;
    }

    try {
      await updateProfile({
        id: profileInfo?.data?._id || "",
        ...changed,
      }).unwrap();
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto mt-8 space-y-6">
      {/* Profile Overview Card */}
      <Card className="shadow-lg border rounded-lg overflow-hidden">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex-shrink-0">
            <img
              src={profileInfo?.data?.picture || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {profileInfo?.data?.name || "User"}
            </h2>
            <p className="text-gray-600">{profileInfo?.data?.email}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                Role: {profileInfo?.data?.role}
              </span>
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  profileInfo?.data?.isVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {profileInfo?.data?.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Edit Form */}
      <Card className="shadow-lg border rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-700">
            Edit Profile
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {["name", "phone", "address", "oldPassword", "password"].map(
                (field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as any}
                    render={({ field: controllerField }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-700">
                          {field === "oldPassword"
                            ? "Old Password"
                            : field === "password"
                            ? "New Password"
                            : field.charAt(0).toUpperCase() + field.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...controllerField}
                            type={field.includes("password") ? "password" : "text"}
                            placeholder={`Enter your ${
                              field === "password"
                                ? "new password"
                                : field
                            }`}
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}

              <Button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
