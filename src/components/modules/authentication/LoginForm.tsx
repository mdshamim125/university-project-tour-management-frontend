/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/images/login.jpg";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Password from "@/components/ui/Password";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
// import config from "@/config";
import { useState } from "react";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const DEMO_ACCOUNTS = {
  admin: {
    email: "super@gmail.com",
    password: "12345678",
  },
  user: {
    email: "cse138093brur@gmail.com",
    password: "123qaz!Q",
  },
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: userInfo } = useUserInfoQuery(undefined);

  // console.log(userInfo);
  if (userInfo?.data?.isVerified) {
    navigate("/");
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      setLoading(true);
      const result = await login(userInfo).unwrap();

      console.log(result.success);

      if (result.success) {
        if (result.data.user.isVerified) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(
            "Your account is not verified. Please verify your email.",
          );
          navigate("/verify", { state: userInfo.email });
        }
      }
    } catch (err: any) {
      console.error(err);

      // Safely extract message from backend response
      const message = err?.data?.message || "Something went wrong";

      // Fallback error message
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const handleDemoLogin = async (type: "admin" | "user") => {
    const credentials = DEMO_ACCOUNTS[type];

    try {
      setLoading(true);

      // 👉 visually fill the form (UX win)
      form.setValue("email", credentials.email);
      form.setValue("password", credentials.password);

      const result = await login(credentials).unwrap();

      if (result.success) {
        if (result.data.user.isVerified) {
          toast.success(
            `Logged in as Demo ${type === "admin" ? "Admin" : "User"}`,
          );
          navigate("/");
        } else {
          toast.error("Demo account is not verified");
        }
      }
    } catch (err: any) {
      const message = err?.data?.message || "Demo login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = `${config.baseUrl}/auth/google`;
  // };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-5">
          <div className="p-6 md:col-span-2 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@company.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full flex items-center justify-center"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      onClick={() => handleDemoLogin("user")}
                    >
                      {loading ? "Logging..." : "Demo User"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      onClick={() => handleDemoLogin("admin")}
                    >
                      {loading ? "Logging..." : "Demo Admin"}
                    </Button>
                  </div>

                  {/* <p className="text-xs text-center text-muted-foreground">
                    Demo accounts are read-only. No real data will be changed.
                  </p> */}
                </form>
              </Form>
              {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <div className="w-full">
                <Button
                  onClick={handleGoogleLogin}
                  type="button"
                  variant="outline"
                  title="Login with Google"
                  className="w-full flex items-center justify-center gap-3 
               py-2.5 text-sm font-medium
               border-muted-foreground/20
               hover:bg-muted transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </Button>
              </div> */}

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted md:col-span-3 relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
