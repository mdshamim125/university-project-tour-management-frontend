/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, Loader2, Mail, ShieldCheck, ShieldX } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api"; // adjust path if needed
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).optional(),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number").optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  oldPassword: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
}).refine(
  (data) => {
    if (data.password && !data.oldPassword) return false;
    if (data.oldPassword && !data.password) return false;
    return true;
  },
  {
    message: "Both old and new password are required when changing password",
    path: ["password"],
  }
);

type ProfileFormValues = z.infer<typeof formSchema>;

export default function MyProfile() {
  const { data: profile, isLoading: isProfileLoading, refetch } = useUserInfoQuery(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      oldPassword: "",
      password: "",
    },
  });

  // Sync form with fetched profile data
  useEffect(() => {
    if (profile?.data) {
      form.reset({
        name: profile.data.name || "",
        phone: profile.data.phone || "",
        address: profile.data.address || "",
        oldPassword: "",
        password: "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    const payload: Partial<ProfileFormValues> = {};

    // Only send changed fields
    (["name", "phone", "address", "oldPassword", "password"] as const).forEach((key) => {
      const value = values[key];
      if (value && value !== profile?.data?.[key]) {
        payload[key] = value;
      }
    });

    if (Object.keys(payload).length === 0) {
      toast.info("No changes detected");
      return;
    }

    try {
      await updateProfile({
        id: profile?.data?._id || "",
        ...payload,
      }).unwrap();

      toast.success("Profile updated successfully");
      refetch();
      form.reset({ ...form.getValues(), oldPassword: "", password: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const user = profile?.data;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Profile Header Card */}
      <Card className="mb-10 border-none shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/30 shadow-lg">
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback className="bg-white/20 text-3xl font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user?.name || "Your Name"}</h1>
              <p className="mt-1 opacity-90 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge variant="secondary" className="text-base px-4 py-1">
                {user?.role || "User"}
              </Badge>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-sm text-muted-foreground">Verification</span>
              {user?.isVerified ? (
                <div className="flex items-center gap-2 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <ShieldX className="h-5 w-5" />
                  <span className="font-medium">Not Verified</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Update Profile</CardTitle>
          <CardDescription>
            Update your personal information and password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+8801xxxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your current address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Change */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Change Password</h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="New password (min 6 characters)"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={isUpdating || isProfileLoading}
                  className="min-w-[160px]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}