import { RegisterForm } from "@/components/modules/authentication/RegisterForm";

export default function Register() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <RegisterForm />
      </div>
    </div>
  );
}
